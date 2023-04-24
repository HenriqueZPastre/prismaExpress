import { PrismaClient } from '@prisma/client'
import { Response } from 'express'
import { HandleResponse } from '../utils/HandleResponse'
import { ModelLancamentos } from '../models/lancamentos'
import { ZodError } from 'zod'
import { CONTAS } from './contas'
import { TAGS } from './tags'
import { PAGINATOR } from '../utils/Paginator'
import { ParamsId } from '../utils/paramsId'

const prisma = new PrismaClient()

export const LancamentosController = {

	async listAll(req: PAGINATOR.Paginator, res: Response) {
		const { skip, take, order, orderBy } = PAGINATOR.main(req.query)
		const lancamentos = await prisma.lancamentos.findMany({
			select: {
				id: true,
				descricao: true,
				valor: true,
				dataVencimento: true,
				dataPagamento: true,
				tipo: true,
				contasNome: true,
				situacao: true,
				lancamentos_tags: {
					select: {
						tags: {
							select: {
								nome: true,
								id: true,
							}
						},
					},
					where: {
						deletede_at: null
					}
				},
			},
			where: {
				deletede_at: null
			},
			orderBy: orderBy ? orderBy : {
				id: order || 'desc'
			},
			skip: skip,
			take: take,
		})
		if (lancamentos.length < 1) {
			return HandleResponse(res, 404, { mensagem: 'Nenhum lançamento encontrado' },)
		}
		return HandleResponse(res, 200, { response: lancamentos })
	},

	async create(req: ModelLancamentos.CreateLancamentos, res: Response) {
		try {
			const { descricao, valor, dataVencimento, dataPagamento, tipo, contasId, tagsId } = ModelLancamentos.zodLancamentos.create.parse(req.body)
			const conta = await CONTAS.contaExiste(contasId)
			const dataAtual = new Date()
			let situacao = req.body.situacao
			if (dataPagamento !== undefined && new Date(dataPagamento) <= dataAtual && situacao === undefined) {
				situacao = 1 //fechada
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
						create: tags?.map((tag: { id: number }) => {
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
			if (err instanceof ZodError) {
				return HandleResponse(res, 400, { zod: err, extras: err })
			}
			return HandleResponse(res, 500, { mensagem: err })
		}
	},

	async delete(req: ParamsId.RequestParamsId, res: Response) {
		const id = parseInt(req.params.id)

		try {
			await prisma.lancamentos.update({
				data: {
					deletede_at: new Date(),
					lancamentos_tags: {
						updateMany: {
							data: {
								deletede_at: new Date()
							},
							where: {
								lancamentosId: id
							}
						}
					}
				},
				where: {
					id: id
				}
			})
		} catch (err) {
			if (err instanceof ZodError) {
				return HandleResponse(res, 400, { zod: err, extras: err })
			}
			return HandleResponse(res, 500, { mensagem: err })
		}
		return HandleResponse(res, 200, { mensagem: 'Lançamento deletado com sucesso' })
	}

}
