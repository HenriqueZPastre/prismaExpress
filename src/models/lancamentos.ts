import { Request } from 'express'
import { z } from 'zod'
import { ParamsId } from '../utils/paramsId'

//0 é entrada, 1 é saida 
export const schema_create_lancamentos = z.object({
	descricao: z.string().trim().max(60).min(2),
	valor: z.number().min(1),
	dataVencimento: z.union([z.date(), z.string()]),
	contasId: z.number(),
	dataPagamento: z.union([z.date(), z.string()]).optional(),
	tipo: z.union([z.literal(0), z.literal(1)]),
	tagsId: z.array(z.number()).optional()
})

export type createLancamentos = z.infer<typeof schema_create_lancamentos>
export interface CreateLancamentos extends Request {
	body: createLancamentos
}

export const schema_editar_lancamentos = z.object({
	descricao: z.string().trim().max(60).min(2).optional(),
	valor: z.number().min(1).optional(),
	dataVencimento: z.union([z.date(), z.string()]).optional(),
	contasId: z.number().optional(),
	dataPagamento: z.union([z.date(), z.string()]).optional(),
	tipo: z.union([z.literal(0), z.literal(1)]).optional(),
	tags: z.array(z.number()).optional()
})

export type editarLancamentos = z.infer<typeof schema_editar_lancamentos>

export interface EditarLancamentos extends Request {
	params: ParamsId.paramsId
	body: editarLancamentos
}

export * as Lancamentos from './lancamentos'