import { PrismaClient } from '@prisma/client'

import { HandleResponse } from '../../utils/HandleResponse/HandleResponse'
import { Response, Request } from 'express'
import { ICreateBancos, IProcurarBancos, listarBancos } from '../../models/bancos/bancosInterface'

const prisma = new PrismaClient()

export const Bancos = {
	async cadastrarBancos(req: ICreateBancos, res: Response) {

		try {
			await Promise.all(req.body.bancos.map(async (banco) => {

				const t = parseInt(banco.id)
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


	async listarBancos(req: IProcurarBancos, res: Response): Promise<listarBancos[]> {
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
	},

	async getId(req: Request, res: Response) {
		const id = parseInt(req.params.id)
		const banco = await prisma.bancos.findUnique({
			where: {
				id: id
			}
		})
		if (!banco) {
			return HandleResponse.main(res, 404, { erro: 'Banco não encontrado' })
		}
		return HandleResponse.main(res, 200, { data: banco })
	}

}