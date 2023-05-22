import { PrismaClient } from '@prisma/client'

import { HandleResponse } from '../Utils/HandleResponse/HandleResponse'
import { Request, Response } from 'express'
import { IRequestPaginator, Paginator } from '../Utils/Paginator/Paginator'

const prisma = new PrismaClient()

export const xuxo = {
	async listAll(req: IRequestPaginator, res: Response) {
		const { skip, take, colunaParaOrdenacao, order } = Paginator.main(req.query)
		const tags = await prisma.tags.findMany({
			select: {
				id: true,
				nome: true,
			},
			take: take,
			skip: skip,
			orderBy: colunaParaOrdenacao ? colunaParaOrdenacao : {
				id: order || 'desc'
			},
		})
		return HandleResponse.main(res, 200, { data: tags })
	},

	async test(req: Request, res: Response) {
		res.sendFile('index.html', { root: 'src' })
	}

}



