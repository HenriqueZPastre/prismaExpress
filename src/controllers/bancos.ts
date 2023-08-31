import { PrismaClient } from '@prisma/client'
import { CreateBancos, listarBancos, ProcurarBancos } from '../models/bancos'
import { HandleResponse } from '../utils/HandleResponse/HandleResponse'
import { Response } from 'express'

const prisma = new PrismaClient()

export const Bancos = {
	async cadastrarBancos(req: CreateBancos, res: Response) {
		try {
			await Promise.all(req.body.bancos.map(async (banco) => {

				const t = parseInt(banco.codigo)
				const existe = await prisma.bancos.findUnique({
					where: {
						id: t
					}
				})

				if (!existe) {
					await prisma.bancos.create({
						data: {
							id: t,
							nome: banco.nome
						}
					})
				}

			}))

			HandleResponse.main(res, 200, { data: 'bancos' })
		} catch (err) {
			HandleResponse.main(res, 400, { erro: err })
		}
	},


	async listarBancos(req: ProcurarBancos, res: Response): Promise<listarBancos[]> {
		const bancos = await prisma.bancos.findMany({
			select: {
				id: true,
				nome: true
			},

			where: {
				deletede_at: null,
				OR: [
					{ id: parseInt(req.query.search) ? parseInt(req.query.search) : undefined },
					{
						nome: {
							contains: req.query.search ? req.query.search : undefined
						}
					},
				]
			}

		})
		HandleResponse.main(res, 200, { data: bancos })
		return bancos
	}

}