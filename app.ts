import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.get('/feed', async (_, res) => {
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

app.listen(3000)
