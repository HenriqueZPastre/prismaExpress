import { z } from 'zod'

export const zodBancos = {

	prisma: z.object({
		id: z.number().int(),
		create_at: z.date(),
		delete_at: z.date().nullable(),
		update_at: z.date().nullable(),
		nome: z.string(),
	}),

	create: z.object({
		id: z.string().trim(),
		nome: z.string().trim(),
	}),

	listarBancos: z.object({
		id: z.number().int(),
		nome: z.string(),
	}),
}