import { OpenAPIV3 } from 'openapi-types'

export interface ParametersCustomSwagger {
	name: OpenAPIV3.ParameterObject['name'],
	in: OpenAPIV3.ParameterObject['in'],
	required?: OpenAPIV3.ParameterBaseObject['required'],
	schema: OpenAPIV3.ParameterBaseObject['schema'],
	description?: OpenAPIV3.ParameterBaseObject['description'],
}

export const id: ParametersCustomSwagger = {
	name: 'id',
	in: 'path',
	required: true,
	schema: {
		type: 'integer'
	},
	description: 'Id da conta',
}

export const Paginator: ParametersCustomSwagger[] = [
	{
		name: 'pagina',
		in: 'path',
		required: true,
		schema: {
			type: 'integer'
		},
		description: 'Página atual desejada, se for undefined pega a pagina 1'
	},
	{
		name: 'all',
		in: 'path',
		schema: {
			type: 'boolean'
		},
		description: 'Se for true, retorna todos os registros.'
	},
	{
		name: 'take',
		in: 'path',
		schema: {
			type: 'integer'
		},
		description: 'Quantidade de registros por página (default 15)'
	},
	{
		name: 'order',
		in: 'path',
		schema: {
			type: 'string'
		},
		description: `Ordenação dos registros exemplo: <br>
		orderBy = desc | asc	
		`
	}
]

export const orderBy = (objeto: object): OpenAPIV3.ParameterObject => {
	const keys = Object.keys(objeto)
	return {
		name: 'orderby',
		in: 'path',
		schema: {
			type: 'string',
			enum: keys
		},
		description: 'Colunas para ordenação dos registros'
	}
}

export * as swaggerUtils from './parametros'