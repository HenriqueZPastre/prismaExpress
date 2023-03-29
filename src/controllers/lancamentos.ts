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

	async listAll(req: Query, res: Response) {
		let limit: number | undefined = Number(req.query.limit)
		let page: number = Number(req.query.page)
		let all = req.query.all
		let next = undefined

		if (all === 'true') {
			limit = undefined
			page = NaN
		} else {
			if (!limit) {
				limit = 15
			}
		}

		if (page && limit) {
			page > 1 ? next = (page - 1) * limit : next = undefined
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
			return HandleResponse(res, 404, {mensagem:"Nenhum lançamento encontrado"}, )
		}
		return HandleResponse(res, 200, {response:lancamentos})
	}
}
