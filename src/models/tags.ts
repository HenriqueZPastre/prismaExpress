import { Request } from 'express'
import { z } from 'zod'
import { ParamsId } from '../utils/paramsId'
import { generateSchema } from '@anatine/zod-openapi'

export const zodTag = {
	tag: z.object({
		nome: z.string().trim().max(60).min(2),
	}),
	listar: z.object({
		id: z.number().int(),
		nome: z.string().trim().max(60).min(2),
	})
}

export type tag = z.infer<typeof zodTag.tag>

export interface Tag extends Request {
	body: tag
}

export interface TagEditar extends Request {
	params: ParamsId.paramsId
	body: tag
}

export const ModelsSwaggerTag = {
	create: generateSchema(zodTag.tag),
	responseCreateTag: generateSchema(zodTag.listar),
	responseListarTags: generateSchema(z.array(zodTag.listar)),
	editar: generateSchema(zodTag.tag),
	responseGetTag: generateSchema(zodTag.listar),
}

export * as ModelTAG from './tags'