import { PrismaClient } from "@prisma/client"
import e, { Request, Response } from "express"
import { createContas, editarContas, listarContas } from "src/models/contas"

const prisma = new PrismaClient()

export const CONTAS = {
	async listAll(_req: Request, res: Response,) {
		const all: listarContas[] = await prisma.contas.findMany({
			select: {
				id: true,
				nome: true,
				saldoInicial: true,
				saldoAtual: true,
			},
			where: {
				deletede_at: null
			}
		})

		if (all.length < 1) {
			return res.status(404).json({ message: 'Nenhuma conta encontrada' })
		}

		res.status(200).json(all)
	},

	async createConta(req: Request<createContas>, res: Response,) {
		if (!req.body.nome) {
			return res.status(400).json({ erro: 'Nome é obrigatório' })
		}
		if (!req.body.saldoInicial) {
			req.body.saldoInicial = 0
		}
		if (!req.body.saldoAtual) {
			req.body.saldoAtual = 0
		}
		await prisma.contas.create({
			data: req.body
		})
		res.status(201).json()
	},

	async deleteConta(req: Request<{ id: string }>, res: Response,) {
		const a = await prisma.contas.findFirst({
			select: {
				nome: true
			},
			where: {
				id: parseInt(req.params.id),
				deletede_at: null,

			},

		})

		const b = await prisma.lancamentos.findFirst({
			select: {
				id: true
			},
			where: {
				contasId: parseInt(req.params.id),
				deletede_at: null,
			}
		})

		console.log(b)

		if (!a) {
			return res.status(404).json({ message: 'Conta não encontrada' });
		}

		if (b) {
			return res.status(404).json({ message: 'Conta não pode ser excluida pois possui vinculo com outros dados do banco' });
		}


		await prisma.contas.update({
			data: {
				deletede_at: new Date()
			},
			where: {
				id: parseInt(req.params.id)
			}
		})
		res.status(204).send()
	},

	async editarConta(req: Request<{ id: string }>, resp: Response) {

		const id: { id: string } = req.params


		const body: editarContas = req.body
		console.log(typeof body.nome)

		if (Object.keys(body).length < 1) {
			return resp.status(404).json({
				message: "Não existe nenhum parametro para alteração"
			})
		}

		if (typeof body.nome?.toString != 'string' || typeof body.nome?.toString != 'undefined') {
			body.nome = body.nome?.toString()
		}
		
		if (typeof body.nome?.toString != 'string' || typeof body.nome?.toString != 'undefined') {
			body.nome = body.nome?.toString()
		}







		try {
			const editar = await prisma.contas.update({
				data: body,
				where: {
					id: parseInt(id.id)
				}
			})
			resp.status(200).json({})
		} catch (err) {
			console.log(err)
			resp.status(404).json({
				message: "Houve um erro com a request ou a conta em especifico não existe",
				erro: err
			})
		}
	}
}

