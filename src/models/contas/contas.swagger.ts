import { generateSchema } from '@anatine/zod-openapi'
import { zodContas } from './contas'
import { z } from 'zod'

export const ModelsSwaggerContas = {
	create: generateSchema(zodContas.create),
	responseCreateConta: generateSchema(zodContas.responseContas),
	responseListarContas: generateSchema(z.array(zodContas.listar)),
	editar: generateSchema(zodContas.editar),
	responseGetConta: generateSchema(zodContas.listar),
}