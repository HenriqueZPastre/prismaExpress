import { PrismaClient } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";

const prisma = new PrismaClient()

export const tiposLancamentos = {
	async getAll(_req: Request, res: Response) {
		const posts = await prisma.tiposLancamentos.findMany({
			select: {
				Nome: true,
				id: true,
				create_at: true
			},
			where: {
				deletede_at: null,
			},
			orderBy: {
				id: 'asc'
			}
		})
		res.json(posts)
	}
}
