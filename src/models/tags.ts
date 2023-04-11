import { Request } from 'express'
import { z } from 'zod'
import { ParamsId } from '../utils/paramsId'

export const schema_tag = z.object({
	nome: z.string().trim().max(60).min(2),
})

export type tag = z.infer<typeof schema_tag>

export interface Tag extends Request {
	body: tag
}

export interface TagEditar extends Request {
	params: ParamsId.paramsId
	body: tag
}

const schema_tag_l = z.object({
	id: z.number(),
	nome: z.string().trim().max(60).min(2),
})

export const schema_tag_listar = z.array(schema_tag_l)

export * as TAG from './tags'