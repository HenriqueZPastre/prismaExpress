import { swaggerContas } from '../models/contas'

export const schema = {
	'createContas': swaggerContas.create,
	'listarContas': swaggerContas.responseListarContas,
	'editarContas': swaggerContas.editar,
	'getConta': swaggerContas.responseGetConta,
	'responseCreateConta': swaggerContas.responseCreateConta
}

export type schemaKeys = keyof typeof schema

export const getSchema = (schema: schemaKeys) => {
	return `#/components/schemas/${schema}`
}