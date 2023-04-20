import { Request } from 'express'
import { z } from 'zod'
import { ParamsId } from '../utils/paramsId'
import { generateSchema } from '@anatine/zod-openapi'

export const schema_create_contas = z.object({
	id: z.number().int().optional(),
	create_at: z.date().optional(),
	nome: z.string().max(60).min(2).trim(),
	saldoInicial: z.number().min(1).optional(),
	saldoAtual: z.number().min(1).optional(),
})

export type createContas = z.infer<typeof schema_create_contas>
export interface CreateContas extends Request {
	body: createContas
}

const responseContas = z.object({
	id: z.number().int(),
	nome: z.string()
})

//Listar todas as contas
export const schema_lista_contas_objetos = z.object({
	id: z.number().int(),
	nome: z.string().trim(),
	saldoInicial: z.number(),
	saldoAtual: z.number(),
})

export const schema_lista_contas = z.array(schema_lista_contas_objetos)

export type listarContas = z.infer<typeof schema_lista_contas_objetos>

//Editar contas
export const schema_edita_contas = z.object({
	nome: z.string().trim().optional(),
	saldoInicial: z.number().min(1).optional(),
})

export type editarContas = z.infer<typeof schema_edita_contas>

export interface EditarContas extends Request {
	params: ParamsId.paramsId
	body: editarContas
}

export const swaggerContas = {
	create: generateSchema(schema_create_contas),
	responseCreateConta : generateSchema(responseContas),
	responseListarContas: generateSchema(schema_lista_contas),
	editar: generateSchema(schema_edita_contas),
	responseGetConta: generateSchema(schema_lista_contas_objetos),
}

export * as Contas from './contas'