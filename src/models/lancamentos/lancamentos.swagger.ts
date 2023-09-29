import { generateSchema } from '@anatine/zod-openapi'
import { zodLancamentos } from './lancamentos'
import { z } from 'zod'

export const ModelsSwaggerLancamentos = {
	create: generateSchema(zodLancamentos.create),
	responseCreate: generateSchema(zodLancamentos.responseCreate),
	editar: generateSchema(zodLancamentos.editar),
	listarLancamentos: generateSchema(z.array(zodLancamentos.responseCreate))
}