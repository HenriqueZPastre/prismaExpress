import { PrismaClient } from '@prisma/client'
import { Response } from 'express'
import { HandleResponse } from '../utils/HandleResponse/HandleResponse'
import { ModelContas } from '../models/contas'
import { ZodError } from 'zod'
import { ParametroID } from '../utils/parametroID'
import { ErrorGenerico } from '../utils/HandleResponse/erroGenerico'
import { ModelLancamentos } from '../models/lancamentos'
import { IRequestPaginator, Paginator } from '../utils/Paginator/Paginator'


const prisma = new PrismaClient()

export const CONTAS = {
	async listAll(_req: IRequestPaginator, res: Response,) {
		const { skip, take } = Paginator.main(_req.query)
		const all: ModelContas.listarContas[] = await prisma.contas.findMany({
			select: {
				id: true,
				nome: true,
				saldoInicial: true,
				saldoAtual: true,
			},
			where: {
				deletede_at: null
			},
			take: take,
			skip: skip,
		})

		try {
			ModelContas.zodContas.listar.parse(all)
		} catch (err) {
			if (err instanceof ZodError) {
				return HandleResponse.main(res, 400, { zod: err })
			}
			return HandleResponse.main(res, 400, { erro: err })
		}

		if (all.length < 1) {
			return HandleResponse.main(res, 404, { mensagem: 'Nenhuma conta encontrada' },)
		}
		return HandleResponse.main(res, 200, { data: all })
	},

	async createConta(req: ModelContas.CreateContas, res: Response,) {
		try {
			const { nome, saldoInicial, saldoAtual, codigoBanco } = ModelContas.zodContas.create.parse(req.body)
			const create = await prisma.contas.create({
				data: {
					codigoBanco: codigoBanco,
					nome: nome,
					saldoInicial: saldoInicial || 0,
					saldoAtual: saldoAtual || 0
				}
			})
			return HandleResponse.main(res, 201, { data: create.id.toString() })
		} catch (err) {
			if (err instanceof ZodError) {
				return HandleResponse.main(res, 400, { zod: err })
			}
			return HandleResponse.main(res, 400, { erro: err })
		}
	},

	async deleteConta(req: ParametroID.RequestParametroID, res: Response,) {
		const id = parseInt(req.params.id)

		const selectConta = await prisma.contas.findFirst({
			where: {
				id: id,
				deletede_at: null,
			},
		})

		const verificarLancamentosVinculados = await prisma.lancamentos.findFirst({
			where: {
				contasId: id,
				deletede_at: null,
			}
		})

		if (!selectConta) {
			return HandleResponse.main(res, 404, { erro: 'Conta não encontrada' },)
		}

		if (verificarLancamentosVinculados) {
			return HandleResponse.main(res, 400, { mensagem: 'Conta não pode ser excluida pois possui vinculo com outros dados do banco' },)
		}

		await prisma.contas.update({
			data: {
				deletede_at: new Date()
			},
			where: {
				id: id
			}
		})
		return HandleResponse.main(res, 204)
	},

	async editarConta(req: ModelContas.EditarContas, resp: Response) {
		const id = parseInt(req.params.id)
		try {
			const { nome, saldoInicial } = ModelContas.zodContas.editar.parse(req.body)
			if (!nome && !saldoInicial) {
				return HandleResponse.main(resp, 400, { erro: 'Nenhum dado foi informado para edição' },)
			}
			await prisma.contas.update({
				data: {
					nome: nome,
					saldoInicial: saldoInicial
				},
				where: {
					id: id,
				},
			})
		} catch (err) {
			if (err instanceof ZodError) {
				return HandleResponse.main(resp, 400, { zod: err })
			}
			return HandleResponse.main(resp, 500, { erro: 'Não foi possível editar a conta' },)
		}
		return HandleResponse.main(resp, 204)
	},

	async getById(req: ParametroID.RequestParametroID, res: Response) {
		const id = parseInt(req.params.id)
		const conta = await prisma.contas.findFirst({
			select: {
				id: true,
				nome: true,
				saldoInicial: true,
				saldoAtual: true,
			},
			where: {
				id: id,
				deletede_at: null
			}
		})

		if (!conta) {
			return HandleResponse.main(res, 404, { erro: 'Conta não encontrada' },)
		}
		return HandleResponse.main(res, 200, { data: conta })
	},

	contaExiste: async (id: number) => {
		const conta = await prisma.contas.findFirst({
			where: {
				id: id,
				deletede_at: null
			}
		})
		if (!conta) {
			throw ErrorGenerico.main('Conta não encontrada')
		}
		return conta
	},

	atualizarSaldo: async (lancamentos: ModelLancamentos.infoValores) => {
		const select = {
			saldoAtual: true,
			id: true,
			nome: true,
			saldoInicial: true,
		}
		if (lancamentos.situacao === 1) {
			let atualizaValor
			if (lancamentos.tipo === 0) {
				atualizaValor = await prisma.contas.update({
					select: select,
					where: {
						id: lancamentos.contasId
					},
					data: {
						saldoAtual: {
							increment: lancamentos.valor
						}
					}
				})
			} else {
				atualizaValor = await prisma.contas.update({
					select: select,
					where: {
						id: lancamentos.contasId
					},
					data: {
						saldoAtual: {
							decrement: lancamentos.valor
						}
					}
				})
			}
			return atualizaValor
		}
		return undefined
	}
}

