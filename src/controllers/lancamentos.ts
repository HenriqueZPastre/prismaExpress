import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { HandleResponse } from "../utils/HandleResponse"

//Data de venciemnto é defaut now()
type Lancamentos = {
	descricao: string,
	valor: number,
	dataVencimento: Date,
	dataPagamento: Date,
	tipo: 0 | 1,
	contasId: number,
	contasNome: string
}

const prism = new PrismaClient()

export const LancamentosController = {
	async listAll(req: Request, res: Response) {
		const lancamentos = await prism.lancamentos.findMany({
			select: {
				id: true,
				descricao: true,
				valor: true,
				dataVencimento: true,
				dataPagamento: true,
				tipo: true,
				contasId: true
			},
			where: {
				deletede_at: null
			}
		})
		if (lancamentos.length === 0) {
			return HandleResponse(res, 404, "Nenhum lançamento encontrado")
		}
		return HandleResponse(res, 200, lancamentos)
	}
}
