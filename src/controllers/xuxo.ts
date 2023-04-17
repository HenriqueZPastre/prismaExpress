import { PrismaClient } from '@prisma/client'

import { HandleResponse } from '../utils/HandleResponse'
import { Response } from 'express'
import { PAGINATOR } from '../utils/Paginator'

const prisma = new PrismaClient()

export const xuxo = {
	async listAll(req: PAGINATOR.Paginator, res: Response) {
		const { skip, take } = PAGINATOR.main(req.query)
		const tags = await prisma.tags.findMany({
			select: {
				id: true,
				nome: true,
			},
			take: take,
			skip: skip,
		})
		return HandleResponse(res, 200, { response: tags })
	},
}



