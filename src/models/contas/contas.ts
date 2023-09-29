
import { z } from 'zod'

export const zodContas = {
	prisma: z.object({
		id: z.number().int(),
		create_at: z.date(),
		delete_at: z.date().nullable(),
		update_at: z.date().nullable(),
		codigoBanco: z.number().int(),
		nome: z.string().min(2).max(60).trim(),
		saldoInicial: z.number().min(1),
		saldoAtual: z.number().min(1),
	}),

	create: z.object({
		id: z.number().int().optional(),
		create_at: z.date().optional(),
		codigoBanco: z.number(),
		nome: z.string().min(2).max(60).trim(),
		saldoInicial: z.number().min(1).optional(),
		saldoAtual: z.number().min(1).optional(),
	}),

	responseContas: z.object({
		id: z.number().int(),
		nome: z.string()
	}),

	listar: z.object({
		id: z.number().int(),
		nome: z.string().trim(),
		saldoInicial: z.number(),
		saldoAtual: z.number(),
	}),

	editar: z.object({
		nome: z.string().trim().optional(),
		saldoInicial: z.number().min(1).optional(),
	})

}
