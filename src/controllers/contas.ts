import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { listarContas } from "src/models/contas"

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
		res.status(200).json(all)
	}
}
