import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { HandleResponse } from "../utils/HandleResponse"


/**
 * 0 é despesa 1 é receita
 * 
 * Data de venciemnto é defaut now() em caso de estar em branco
 */
type Lancamentos = {
	descricao: string,
	valor: number,
	dataVencimento: Date,
	dataPagamento: Date,
	/**
	 * 0 é despesa 1 é receita
	 */
	tipo: 0 | 1,
	contasId: number,
	contasNome: string
}

let a: Lancamentos


interface Query extends Request {
	query: {
		page?: string,
		all?: string,
		limit?: string
	}
}

const prisma = new PrismaClient()

export const LancamentosController = {

	/**
	 * 
	 * @param req 
	 * @param res 
	 * @returns 
	 */
	async listAll(req: Query, res: Response) {
		let next
		let limit: number | undefined = 15
		if (req.query.all === 'true') {
			next = undefined
			limit = undefined
		}

		if (req.query.limit) { limit = Number(req.query.limit) }

		const page = Number(req.query.page)
		if (page > 1 && !req.query.all) {
			next = (page - 1) * Number(limit)
		}

		const lancamentos = await prisma.lancamentos.findMany({
			select: {
				id: true,
				descricao: true,
				valor: true,
				dataVencimento: true,
				dataPagamento: true,
				tipo: true,
				contasId: true,
				contasNome: true
			},
			where: {
				deletede_at: null
			},
			orderBy: {
				id: 'desc',
			},
			skip: next,
			take: limit,
		})
		if (lancamentos.length === 0) {
			return HandleResponse(res, 404, "Nenhum lançamento encontrado", 'Mensagem')
		}
		return HandleResponse(res, 200, lancamentos)
	}
}
