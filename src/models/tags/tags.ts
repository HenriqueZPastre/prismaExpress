import { z } from 'zod'

export const zodTag = {
	
	prisma: z.object({
		id: z.number().int(),
		create_at: z.date(),
		delete_at: z.date().nullable(),
		nome: z.string().min(2).max(60).trim(),
	}),

	tag: z.object({
		nome: z.string().min(2).max(60).trim(),
	}),

	listar: z.object({
		id: z.number().int(),
		nome: z.string().min(2).max(60).trim(),
	})
}



