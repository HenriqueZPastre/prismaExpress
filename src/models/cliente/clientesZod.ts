import z from 'zod'

export const zodClientes = {
	prisma: z.object({
		id: z.number(),
		create_at: z.date(),
		deletede_at: z.date().optional(),
		update_at: z.date().optional(),
		nome: z.string(),
		password: z.string(),
		email: z.string(),
		telefone: z.string().optional(),
		token: z.string().optional(),
	}),

	create: z.object({
		nome: z.string(),
		email: z.string(),
		password: z.string(),
		telefone: z.string().optional(),
	}),

	loginRequest: z.object({
		email: z.string(),
		password: z.string(),
	}),
}
