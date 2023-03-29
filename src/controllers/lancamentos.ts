import { PrismaClient } from "@prisma/client"
import e, { Request, Response } from "express"
import { HandleResponse } from "../utils/HandleResponse"

const prisma = new PrismaClient()

/**
 * 0 é despesa 1 é receita
 */
type Tipo = 0 | 1

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
	tipo: Tipo
	contasId: number,
	contasNome: string
}

let a: Lancamentos


interface Query extends Request {
	query: {
		pagina?: string,
		all?: string,
		limite?: string
	},
}


export const LancamentosController = {

	async listAll(req: Query, res: Response) {
		const all = req.query.all === 'true' ? Boolean(req.query.all) : null
		let limite: number | undefined = Number(req.query.limite) || 15
		let pagina: number = Number(req.query.pagina)
		let next = undefined

		if (all) {
			limite = undefined
			pagina = NaN
		} 

		if (pagina && limite) {
			pagina > 1 ? next = (pagina - 1) * limite : next = undefined
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
			take: limite,
		})
		if (lancamentos.length === 0) {
			return HandleResponse(res, 404, { mensagem: "Nenhum lançamento encontrado" },)
		}
		return HandleResponse(res, 200, { response: lancamentos })
	}
}
