import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { createContas, editarContas, listarContas } from '../models/contas'
import { HandleResponse } from '../utils/HandleResponse'

const prisma = new PrismaClient()

export const CONTAS = {
	async listAll(_req: Request, res: Response,) {
		const all: listarContas[] = await prisma.contas.findMany({
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

		if (all.length < 1) {
			return HandleResponse(res, 404, { mensagem: 'Nenhuma conta encontrada' },)

		}
		return HandleResponse(res, 200, { response: all })
	},

	async createConta(req: Request<createContas>, res: Response,) {
		if (!req.body.nome) {
			return HandleResponse(res, 404, { erro: 'Nome é obrigatório' },)

		}
		if (!req.body.saldoInicial) {
			req.body.saldoInicial = 0
		}
		if (!req.body.saldoAtual) {
			req.body.saldoAtual = 0
		}
		const create = await prisma.contas.create({
			data: req.body
		})
		return HandleResponse(res, 201, { response: create.id.toString() })
	},

	async deleteConta(req: Request<{ id: string }>, res: Response,) {
		const a = await prisma.contas.findFirst({
			select: {
				nome: true
			},
			where: {
				id: parseInt(req.params.id),
				deletede_at: null,

			},

		})

		const b = await prisma.lancamentos.findFirst({
			select: {
				id: true
			},
			where: {
				contasId: parseInt(req.params.id),
				deletede_at: null,
			}
		})


		if (!a) {
			return HandleResponse(res, 404, { erro: 'Conta não encontrada' },)
		}

		if (b) {
			return HandleResponse(res, 400, { mensagem: 'Conta não pode ser excluida pois possui vinculo com outros dados do banco' },)
		}

		await prisma.contas.update({
			data: {
				deletede_at: new Date()
			},
			where: {
				id: parseInt(req.params.id)
			}
		})
		return HandleResponse(res, 204)
	},

	async editarConta(req: Request<{ id: string }>, resp: Response) {
		const id: { id: string } = req.params
		const body: editarContas = req.body

		if (!body.nome && !body.saldoInicial) {
			return HandleResponse(resp, 400, { erro: 'O corpo da requisição deve incluir pelo menos uma propriedade para alteração' })
		}

		//Trata para que os paremtros sejam connnvertidos para a tipagem correta
		if (typeof body.nome != 'string' || typeof body.nome?.toString != 'undefined') {
			body.nome = body.nome?.toString()
		}

		if (typeof body.saldoInicial == 'string') {
			const parseToFixed = parseFloat(body.saldoInicial).toFixed(2)
			body.saldoInicial = parseFloat(parseToFixed)
		}

		try {
			await prisma.contas.update({
				data: {
					nome: body.nome,
					saldoInicial: body.saldoInicial
				},
				where: {
					id: parseInt(id.id),
				},
			})
			return HandleResponse(resp, 200)

		} catch (err) {
			return HandleResponse(resp, 500, { erro: 'Não foi possível editar a conta' },)
		}
	},

	async getById(req: Request<{ id: string }>, res: Response) {
		const id = req.params.id
		const conta = await prisma.contas.findFirst({
			select: {
				id: true,
				nome: true,
				saldoInicial: true,
				saldoAtual: true,
			},
			where: {
				id: parseInt(id),
				deletede_at: null
			}
		})

		if (!conta) {
			return HandleResponse(res, 404, { erro: 'Conta não encontrada' },)
		}
		return HandleResponse(res, 200, { response: conta })
	}

}

