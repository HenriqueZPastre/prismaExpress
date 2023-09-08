import { Request } from 'express'
import { z } from 'zod'
import { ParametroID } from '../utils/parametroID'
import { generateSchema } from '@anatine/zod-openapi'

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

export type createContas = z.infer<typeof zodContas.create>
export type listarContas = z.infer<typeof zodContas.listar>
export type editarContas = z.infer<typeof zodContas.editar>
export interface CreateContas extends Request {
	body: createContas
}
export interface EditarContas extends Request {
	params: ParametroID.parametroID
	body: editarContas
}

export const ModelsSwaggerContas = {
	create: generateSchema(zodContas.create),
	responseCreateConta: generateSchema(zodContas.responseContas),
	responseListarContas: generateSchema(z.array(zodContas.listar)),
	editar: generateSchema(zodContas.editar),
	responseGetConta: generateSchema(zodContas.listar),
}

export * as ModelContas from './contas'