import { Request } from 'express'
import { z } from 'zod'
import { ParamsId } from '../utils/paramsId'
import { generateSchema } from '@anatine/zod-openapi'

export const zodContas = {
	create: z.object({
		id: z.number().int().optional(),
		create_at: z.date().optional(),
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
	params: ParamsId.paramsId
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