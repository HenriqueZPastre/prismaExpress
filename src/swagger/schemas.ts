import { swaggerContas } from '../models/contas'

export const schema = {
	'createContas': swaggerContas.create,
	'listarContas': swaggerContas.listarContas,
	'editarContas': swaggerContas.editar,
	
}

export type schemaKeys = keyof typeof schema

export const getSchema = (schema: schemaKeys) => {
	return `#/components/schemas/${schema}`
}