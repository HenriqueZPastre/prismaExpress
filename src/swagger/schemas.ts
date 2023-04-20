import { swaggerContas } from '../models/contas'
import { swaggerTags } from '../models/tags'

export const schema = {
	'createContas': swaggerContas.create,
	'responseCreateConta': swaggerContas.responseCreateConta,
	'listarContas': swaggerContas.responseListarContas,
	'getConta': swaggerContas.responseGetConta,
	'editarContas': swaggerContas.editar,

	'createTags': swaggerTags.create,
	'responseCreateTag': swaggerTags.responseCreateTag,
	'listarTags': swaggerTags.responseListarTags,
	'getTag': swaggerTags.responseGetTag,
	'editarTags': swaggerTags.editar,
}

export type schemaKeys = keyof typeof schema

export const getSchema = (schema: schemaKeys) => {
	return `#/components/schemas/${schema}`
}