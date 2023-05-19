import { PrismaClient } from '@prisma/client'
import { Response } from 'express'
import { HandleResponse } from '../utils/HandleResponse'
import { ModelLancamentos } from '../models/lancamentos'
import { ZodError } from 'zod'
import { CONTAS } from './contas'
import { TAGS } from './tags'
import { ParametroID } from '../utils/parametroID'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { IRequestPaginator, Paginator } from '../utils/Paginator/Paginator'

const prisma = new PrismaClient()

export const LancamentosController = {

	async listAll(req: IRequestPaginator, res: Response) {
		const { skip, take, order, colunaParaOrdenacao } = Paginator.main(req.query)
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
			orderBy: colunaParaOrdenacao ? colunaParaOrdenacao : {
				id: order || 'desc'
			},
			skip: skip,
			take: take,
		})
		if (lancamentos.length < 1) {
			return HandleResponse(res, 404, { mensagem: 'Nenhum lançamento encontrado' },)
		}
		return HandleResponse(res, 200, { data: lancamentos })
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
				return HandleResponse(res, 201, { data: lancamentos, extras: atualizaValor })
			}
			return HandleResponse(res, 201, { data: lancamentos, })
		} catch (err) {
			if (err instanceof ZodError) {
				return HandleResponse(res, 400, { zod: err, extras: err })
			}
			if (err instanceof Error) {
				return HandleResponse(res, 500, { mensagem: err.message })
			}
			if (err instanceof PrismaClientKnownRequestError) {
				return HandleResponse(res, 400, { mensagem: err.message })
			}
			return HandleResponse(res, 500, { mensagem: err })
		}
	},

	async delete(req: ParametroID.RequestParametroID, res: Response) {
		const id = parseInt(req.params.id)

		try {
			const lancamento = await prisma.lancamentos.update({
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
			if (lancamento.situacao === 1) {
				lancamento.tipo === 0 ? lancamento.tipo = 1 : lancamento.tipo = 0
				const atualizaValor = await CONTAS.atualizarSaldo(lancamento)
				if (atualizaValor) {
					return HandleResponse(res, 200, { mensagem: 'Lançamento deletado com sucesso', extras: atualizaValor })
				}
			}
		} catch (err) {
			if (err instanceof ZodError) {
				return HandleResponse(res, 400, { zod: err, extras: err })
			}
			return HandleResponse(res, 500, { mensagem: err })
		}
		return HandleResponse(res, 200, { mensagem: 'Lançamento deletado com sucesso' })
	},

	async update(req: ModelLancamentos.EditarLancamentos, res: Response) {
		const id = parseInt(req.params.id)
		try {
			const validaBody = ModelLancamentos.zodLancamentos.editar.parse(req.body)

			const update = await prisma.lancamentos.update({
				data: {
					descricao: validaBody.descricao,
					valor: validaBody.valor,
					dataVencimento: validaBody.dataVencimento,
					dataPagamento: validaBody.dataPagamento,
					tipo: validaBody.tipo,
					situacao: validaBody.situacao,
					lancamentos_tags: {
						updateMany: {
							data: {
								deletede_at: new Date()
							},
							where: {
								deletede_at: null,
								NOT: {
									tagsId: {
										in: validaBody.tags
									}
								}
							},
						},
					}
				},
				where: {
					id: id
				}
			})

			if (validaBody.situacao !== undefined) {
				await CONTAS.atualizarSaldo(update)
			}

			validaBody.tags?.map(async (tag: number) => {
				const existe = await prisma.lancamentos_tags.findFirst({
					where: {
						lancamentosId: id,
						tagsId: tag,
						deletede_at: null
					}
				})
				if (!existe) {
					await prisma.lancamentos_tags.create({
						data: {
							lancamentosId: id,
							tagsId: tag
						}
					})
				}
			})
			return HandleResponse(res, 200, { data: update })
		} catch (err) {
			if (err instanceof ZodError) {
				return HandleResponse(res, 400, { zod: err, extras: err })
			}
			return HandleResponse(res, 500, { mensagem: err })
		}
	},

	async getId(req: ParametroID.RequestParametroID, res: Response) {
		const id = parseInt(req.params.id)
		const lancamentos = await prisma.lancamentos.findFirst({
			where: {
				id: id,
				deletede_at: null
			},
			select: {
				id: true,
				descricao: true,
				valor: true,
				dataVencimento: true,
				dataPagamento: true,
				tipo: true,
				contasId: true,
				contasNome: true,
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
			}
		})
		if (!lancamentos) {
			return HandleResponse(res, 404, { mensagem: 'Lançamento não encontrado' })
		}
		return HandleResponse(res, 200, { data: lancamentos })
	}

}
