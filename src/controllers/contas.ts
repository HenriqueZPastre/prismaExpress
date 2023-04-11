import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { HandleResponse } from '../utils/HandleResponse'
import { Contas } from '../models/contas'
import { ZodError } from 'zod'
import { ParamsId } from '../utils/paramsId'
import { ErrorGenerico } from '../utils/erroGenerico'


const prisma = new PrismaClient()

export const CONTAS = {
	async listAll(_req: Request, res: Response,) {
		const all: Contas.listarContas[] = await prisma.contas.findMany({
			select: {
				id: true,
				nome: true,
				saldoInicial: true,
				saldoAtual: true,
			},
			where: {
				deletede_at: null
			}
		})

		try {
			Contas.schema_lista_contas.parse(all)
		} catch (err) {
			if (err instanceof ZodError) {
				return HandleResponse(res, 400, { zod: err })
			}
			return HandleResponse(res, 400, { erro: err })
		}

		if (all.length < 1) {
			return HandleResponse(res, 404, { mensagem: 'Nenhuma conta encontrada' },)
		}

		return HandleResponse(res, 200, { response: all })

	},

	async createConta(req: Contas.CreateContas, res: Response,) {
		try {
			const { nome, saldoInicial, saldoAtual } = Contas.schema_create_contas.parse(req.body)
			const create = await prisma.contas.create({
				data: {
					nome: nome,
					saldoInicial: saldoInicial || 0,
					saldoAtual: saldoAtual || 0
				}
			})
			return HandleResponse(res, 201, { response: create.id.toString() })
		} catch (err) {
			if (err instanceof ZodError) {
				return HandleResponse(res, 400, { zod: err })
			}
			return HandleResponse(res, 400, { erro: err })
		}
	},

	async deleteConta(req: ParamsId.RequestParamsId, res: Response,) {
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
			return HandleResponse(res, 404, { erro: 'Conta não encontrada' },)
		}

		if (verificarLancamentosVinculados) {
			return HandleResponse(res, 400, { mensagem: 'Conta não pode ser excluida pois possui vinculo com outros dados do banco' },)
		}

		await prisma.contas.update({
			data: {
				deletede_at: new Date()
			},
			where: {
				id: id
			}
		})
		return HandleResponse(res, 204)
	},

	async editarConta(req: Contas.EditarContas, resp: Response) {
		const id = parseInt(req.params.id)
		try {
			const { nome, saldoInicial } = Contas.schema_edita_contas.parse(req.body)
			if (!nome && !saldoInicial) {
				return HandleResponse(resp, 400, { erro: 'Nenhum dado foi informado para edição' },)
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
				return HandleResponse(resp, 400, { zod: err })
			}
			return HandleResponse(resp, 500, { erro: 'Não foi possível editar a conta' },)
		}
		return HandleResponse(resp, 200)
	},

	async getById(req: ParamsId.RequestParamsId, res: Response) {
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
			return HandleResponse(res, 404, { erro: 'Conta não encontrada' },)
		}
		return HandleResponse(res, 200, { response: conta })
	},

	async contaExiste(id: number) {
		const conta = await prisma.contas.findFirst({
			where: {
				id: id,
				deletede_at: null
			}
		})
		if (!conta) {
			throw ErrorGenerico('Conta não encontrada')
		}
		return conta
	}
}

