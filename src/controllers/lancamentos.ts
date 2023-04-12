import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { HandleResponse } from '../utils/HandleResponse'
import { Lancamentos } from '../models/lancamentos'
import { ZodError } from 'zod'
import { CONTAS } from './contas'
import { TAGS } from './tags'

const prisma = new PrismaClient()

export const LancamentosController = {

	async listAll(req: Request, res: Response) {
		const all = req.query.all === 'true' ? Boolean(req.query.all) : null
		let limite: number | undefined = Number(req.query.limite) || 15
		let pagina = Number(req.query.pagina)
		let proximaPagina = undefined

		if (all) {
			limite = undefined
			pagina = NaN
		}

		if (pagina && limite) {
			pagina > 1 ? proximaPagina = (pagina - 1) * limite : proximaPagina = undefined
		}

		const lancamentos = await prisma.lancamentos.findMany({
			select: {
				id: true,
				descricao: true,
				valor: true,
				dataVencimento: true,
				dataPagamento: true,
				tipo: true,
				contasNome: true,
				lancamentos_tags: {
					select: {
						tagsId: true,
					}
				},
			},
			where: {
				deletede_at: null
			},
			orderBy: {
				id: 'desc',
			},
			skip: proximaPagina,
			take: limite,
		})
		if (lancamentos.length < 1) {
			return HandleResponse(res, 404, { mensagem: 'Nenhum lançamento encontrado' },)
		}
		return HandleResponse(res, 200, { response: lancamentos })
	},

	async create(req: Lancamentos.CreateLancamentos, res: Response) {
		try {
			const { descricao, valor, dataVencimento, dataPagamento, tipo, contasId, tagsId } = Lancamentos.schema_create_lancamentos.parse(req.body)
			const conta = await CONTAS.contaExiste(contasId)
			const dataAtual = new Date()
			let situacao = req.body.situacao
			if (dataPagamento !== undefined && new Date(dataPagamento) <= dataAtual && situacao === undefined) {
				situacao = 1
			}
			let tags = undefined
			tagsId != undefined ? tags = await TAGS.verificarSeTagExiste(tagsId) : tags = undefined
			const lancamentos = await prisma.lancamentos.create({
				select: {
					id: true,
					descricao: true,
					valor: true,
					dataVencimento: true,
					dataPagamento: true,
					tipo: true,
					contasNome: true,
					contasId: true,
					situacao: true,
					lancamentos_tags: {
						select: {
							tags: {
								select: {
									id: true,
									nome: true,
								}
							}
						}
					}
				},
				data: {
					descricao: descricao,
					valor: valor,
					dataVencimento: dataVencimento,
					dataPagamento: dataPagamento,
					tipo: tipo,
					contasId: conta.id,
					contasNome: conta.nome,
					situacao: situacao,
					lancamentos_tags: {
						create: tags?.map((tag) => {
							return {
								tags: {
									connect: {
										id: tag.id
									}
								}
							}
						})

					},
				}
			})
			const atualizaValor = await CONTAS.atualizarSaldo(lancamentos)
			if (atualizaValor) {
				return HandleResponse(res, 201, { response: lancamentos, extras: atualizaValor })
			}
			return HandleResponse(res, 201, { response: lancamentos, })
		} catch (err) {
			console.log(err)
			if (err instanceof ZodError) {
				return HandleResponse(res, 400, { zod: err, extras: err })
			}
			return HandleResponse(res, 500, { mensagem: err })
		}
	},
}
