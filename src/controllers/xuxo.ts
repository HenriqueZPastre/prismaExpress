import { PrismaClient } from "@prisma/client"
import { HandleResponse } from "../utils/HandleResponse"
import { Request, Response } from "express"
import { take } from "cypress/types/lodash"

const prisma = new PrismaClient()

interface TT extends Request {
	query: {
		pagina?: string,
		all?: string,
		limite?: string
	},
	params: {
		id?: string
	},
	body: Lancamentos
}

type Lancamentos = {
	descricao: string,
	valor: number,
	dataVencimento: Date,
	dataPagamento: Date,
	tipo: 0 | 1,
	contasId: number,
	contasNome: string
}

export const xuxo = {
	async listAllTag(req: TT, res: Response) {
		const firtDados = await prisma.lancamentos.findMany({
			select: {
				id: true,
				descricao: true,
				valor: true,
				dataVencimento: true,
				dataPagamento: true,
				tipo: true,
				contasNome: true,
				lancamentos_tags: {
					select: {
						tagsId: true,
					}
				},
			},
			orderBy: {
				id: 'desc'
			},
			take: 5
		})

		HandleResponse(res, 200, { response: firtDados })
	},
}