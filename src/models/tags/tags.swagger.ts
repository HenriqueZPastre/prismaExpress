import { generateSchema } from '@anatine/zod-openapi'
import { zodTag } from './tags'
import { z } from 'zod'

export const ModelsSwaggerTag = {
	create: generateSchema(zodTag.tag),
	responseCreateTag: generateSchema(zodTag.listar),
	responseListarTags: generateSchema(z.array(zodTag.listar)),
	editar: generateSchema(zodTag.tag),
	responseGetTag: generateSchema(zodTag.listar),
}