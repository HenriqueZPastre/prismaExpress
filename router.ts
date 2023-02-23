import { PrismaClient } from "@prisma/client";
import express, { Router } from "express";

const router: Router = Router()
export { router };
const prisma = new PrismaClient()

router.get('/feed', async (_, res) => {
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
			create_at: 'desc'
		}
	})
	res.json(posts)
})