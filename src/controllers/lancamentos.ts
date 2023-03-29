import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { HandleResponse } from "../utils/HandleResponse"

const prisma = new PrismaClient()

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
	tipo: 0 | 1,
	contasId: number,
	contasNome: string
}
interface QueryList extends Request {
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

interface QueryCreate extends Request {
	body: {
		descricao: string,
		valor: number,
		dataVencimento: Date,
		dataPagamento?: Date,
		tipo: 0 | 1,
		contasId: number,
		contasNome: string,
		tagsId?: number[]
	}
}

export const LancamentosController = {

	async listAll(req: QueryList, res: Response) {
		const all = req.query.all === 'true' ? Boolean(req.query.all) : null
		let limite: number | undefined = Number(req.query.limite) || 15
		let pagina: number = Number(req.query.pagina)
		let proximaPagina = undefined

		if (all) {
			limite = undefined
			pagina = NaN
		}

		if (pagina && limite) {
			pagina > 1 ? proximaPagina = (pagina - 1) * limite : proximaPagina = undefined
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
			skip: proximaPagina,
			take: limite,
		})
		if (lancamentos.length < 1) {
			return HandleResponse(res, 404, { mensagem: "Nenhum lançamento encontrado" },)
		}
		return HandleResponse(res, 200, { response: lancamentos })
	},

	async create(req: QueryCreate, res: Response) {
		const create = await prisma.lancamentos.create({
			data: {
				descricao: req.body.descricao,
				valor: req.body.valor,
				dataVencimento: req.body.dataVencimento,
				dataPagamento: req.body.dataPagamento,
				tipo: req.body.tipo,
				contasId: req.body.contasId,
				contasNome: req.body.contasNome,
			}
		})

		if (Array.isArray(req.body.tagsId)) {
			req.body.tagsId.forEach(async (tagId) => {
				await prisma.lancamentos_tags.create({
					data: {
						lancamentosId: create.id,
						tagsId: tagId
					}
				})
			})
		}
		return HandleResponse(res, 201,)
	},

	async listAllTag(req: QueryList, res: Response) {
		const all = req.query.all === 'true' ? Boolean(req.query.all) : null
		let limite: number | undefined = Number(req.query.limite) || 15
		let pagina: number = Number(req.query.pagina)
		let proximaPagina = undefined

		if (all) {
			limite = undefined
			pagina = NaN
		}

		if (pagina && limite) {
			pagina > 1 ? proximaPagina = (pagina - 1) * limite : proximaPagina = undefined
		}


		const lancamentos = await prisma.lancamentos.findMany({
			include: {
				lancamentos_tags: {
					select: {
						tagsId: true,
						
					},
				},
			},
			where: {
				deletede_at: null
			},
			orderBy: {
				id: 'desc',
			},
		})

		const a: any = await prisma.$queryRaw`
		SELECT lt.tagsId, l.id,l.descricao,l.valor,l.dataVencimento,l.dataPagamento,l.tipo,l.contasId,l.contasNome
		FROM lancamentos l
		LEFT JOIN lancamentos_tags lt ON l.id = lt.lancamentosId
		WHERE l.deletede_at IS NULL
		ORDER BY l.id DESC;
		`
		if (lancamentos.length < 1) {
			return HandleResponse(res, 404, { mensagem: "Nenhum lançamento encontrado" },)
		}
		return HandleResponse(res, 200, { response: lancamentos })
	},


}
