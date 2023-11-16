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
		//res.sendFile('index.html', { root: 'src' })
		res.send(
			`<!DOCTYPE html>
			<html lang="en">
			
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>
				<style>
					.center-align {
						text-align: center;
					}
				</style>
			</head>
			
			<body>
				<div>
					<div
						style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
						<h1 style="text-align: center;">Rest API desenvolvida com Prisma, Express e testes com Cypress</h1>
						<div>
							<a href="https://prismaexpress.fly.dev/api-docs/" target="_blank">Documentação</a>
						</div>
						<div>
							<br>
							<span>Usario: teste</span>
							<br>
							<span>Senha: teste</span>
						</div>
					</div>
				</div>
			</body>
			
			</html>`
		)
	},

	async ofx(req: Request, res: Response) {
		const { dadosBanco, todasAsTransacoes } = await ReaderOfx(req.body.data)
		const all = {
			dadosBanco: dadosBanco,
			todasAsTransacoes: todasAsTransacoes
		}
		HandleResponse.main(res, 200, { data: all })
	},

	async base64teste(req: Request, res: Response) {
		const string = 'Texto normal'
		const base64 = Buffer.from(string).toString('base64')
		res.send({
			base64: base64
		})
	}

}



