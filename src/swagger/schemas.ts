import { ModelsSwaggerContas } from '../models/contas'
import { ModelsSwaggerTag } from '../models/tags'
import { ModelsSwaggerLancamentos } from '../models/lancamentos'

export const schema = {
	createContas: ModelsSwaggerContas.create,
	responseCreateConta: ModelsSwaggerContas.responseCreateConta,
	listarContas: ModelsSwaggerContas.responseListarContas,
	getConta: ModelsSwaggerContas.responseGetConta,
	editarContas: ModelsSwaggerContas.editar,

	createTags: ModelsSwaggerTag.create,
	responseCreateTag: ModelsSwaggerTag.responseCreateTag,
	listarTags: ModelsSwaggerTag.responseListarTags,
	getTag: ModelsSwaggerTag.responseGetTag,
	editarTags: ModelsSwaggerTag.editar,

	createLancamentos: ModelsSwaggerLancamentos.create,
	responseCreateLancamentos: ModelsSwaggerLancamentos.responseCreate,
	editarLancamentos: ModelsSwaggerLancamentos.editar,
	listarLancamentos: ModelsSwaggerLancamentos.listarLancamentos,
}

export type schemaKeys = keyof typeof schema

export const refSchema = (schema: schemaKeys) => {
	return `#/components/schemas/${schema}`
}