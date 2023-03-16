import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { createContas, listarContas } from "src/models/contas"

const prisma = new PrismaClient()

export const CONTAS = {
	async listAll(_req: Request, res: Response,) {
		const all: listarContas[] = await prisma.contas.findMany({
			select: {
				id: true,
				nome: true,
				saldoInicial: true,
				saldoAtual: true
			},
			where: {
				deletede_at: null
			}
		})

		if (all.length < 1) {
			return res.status(200).json({ message: 'Nenhuma conta encontrada' })
		}

		res.status(200).json(all)
	},

	async createConta(req: Request<createContas>, res: Response,) {
		if (!req.body.nome) {
			return res.status(400).json({ erro: 'Nome é obrigatório' })
		}
		if (!req.body.saldoInicial) {
			req.body.saldoInicial = 0
		}
		if (!req.body.saldoAtual) {
			req.body.saldoAtual = 0
		}
		await prisma.contas.create({
			data: req.body
		})
		res.status(201).json()
	},

	async deleteConta(req: Request<{ id: string }>, res: Response,) {
		const a = await prisma.contas.findFirst({
			select: {
				nome: true
			},
			where: {
				id: parseInt(req.params.id),
				deletede_at: null
			}
		})
		if (!a) {
			return res.status(404).json({ message: 'Conta não encontrada' });
		}
		await prisma.contas.update({
			data: {
				deletede_at: new Date()
			},
			where: {
				id: parseInt(req.params.id)
			}
		})
		res.status(204).send()
	}
}

