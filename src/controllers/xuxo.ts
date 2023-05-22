import { PrismaClient } from '@prisma/client'

import { HandleResponse } from '../utils/HandleResponse/HandleResponse'
import { Request, Response } from 'express'
import { IRequestPaginator, Paginator } from '../utils/Paginator/Paginator'

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
		res.send('OK DEPLY')
	}

}



