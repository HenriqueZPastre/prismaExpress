import { PrismaClient } from '@prisma/client'

import { HandleResponse } from '../utils/HandleResponse/HandleResponse'
import { Request, Response } from 'express'
import { IRequestPaginator, Paginator } from '../utils/Paginator/Paginator'
import { ReaderOfx } from '../../src/reader/main'

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
	},

	async ofx(req: Request, res: Response) {
		const { dadosBanco, todasAsTransacoes } = await ReaderOfx(req.body.data)
		const all = {
			dadosBanco: dadosBanco,
			todasAsTransacoes: todasAsTransacoes
		}
		return HandleResponse.main(res, 200, { data: all })
	}

}



