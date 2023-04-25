import { Request } from 'express'
import { z } from 'zod'
import { ParamsId } from '../utils/paramsId'
import { generateSchema } from '@anatine/zod-openapi'

export const zodTag = {
	tag: z.object({
		nome: z.string().min(2).max(60).trim(),
	}),
	listar: z.object({
		id: z.number().int(),
		nome: z.string().min(2).max(60).trim(),
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