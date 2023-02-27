/* type Contas = {
	gormLike: gormLike
	create_at: Date
	deleted_at?: Date
	nome: string
	saldoInicial: number
	saldoAtual: number
} */

import { Prisma, PrismaClient } from "@prisma/client"
import { Response } from "express"


type gormLike = {
	id: number | undefined
	create_at: Date
	deleted_at?: Date | null
}


type tpLanc = {
	gormLike: gormLike
	Nome: string
}

export const a: tpLanc = {
	gormLike: {
		id: undefined,
		create_at: new Date(),
		deleted_at: null
	},
	Nome: "TESTE365"
}

const t = new PrismaClient()

export const xd = async (teste: tpLanc, res: Response, req?: Request,) => {
	try {
		await t.tiposLancamentos.create({
			data: {
				Nome: teste.Nome,
				create_at: teste.gormLike.create_at,
				id: teste.gormLike.id
			}
		})
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return res.json()
			}
		}
	}
}



