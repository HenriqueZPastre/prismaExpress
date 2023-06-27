import { OpenAPIV3 } from 'openapi-types'
export interface ParametersCustomSwagger {
	name: OpenAPIV3.ParameterObject['name'],
	in: OpenAPIV3.ParameterObject['in'],
	required?: OpenAPIV3.ParameterBaseObject['required'],
	schema: OpenAPIV3.ParameterBaseObject['schema'],
	examples?: OpenAPIV3.ParameterBaseObject['examples'],
	description?: OpenAPIV3.ParameterBaseObject['description'],
}

type parametersCustomSwagger = {
	page: ParametersCustomSwagger,
	all: ParametersCustomSwagger,
	take: ParametersCustomSwagger,
	order: ParametersCustomSwagger,
	id: ParametersCustomSwagger,
}

export const queryParams: parametersCustomSwagger = {
	id: {
		name: 'id',
		in: 'path',
		required: true,
		schema: {
			type: 'integer'
		},
		description: 'Id do registro',
	},
	page: {
		name: 'page',
		in: 'path',
		required: true,
		schema: {
			type: 'integer',
		},
		description: 'Página atual desejada, se for undefined pega a pagina 1'
	},
	all: {
		name: 'all',
		in: 'path',
		schema: {
			type: 'boolean'
		},
		description: 'Se for true, retorna todos os registros.'
	},
	take: {
		name: 'take',
		in: 'path',
		schema: {
			type: 'integer'
		},
		description: 'Quantidade de registros por página (default 15)'
	},
	order: {
		name: 'order',
		in: 'path',
		schema: {
			type: 'string'

		},
		examples: {
			desc: {},
			asc: {}
		},
		description: `Ordenação dos registros: <br>
		order = desc | asc	
		`
	}
}

export const colunas = (objeto: object): OpenAPIV3.ParameterObject => {
	const keys = Object.keys(objeto)
	return {
		name: 'coluna',
		in: 'path',
		schema: {
			type: 'string',
			enum: keys
		},
		description: 'Colunas para ordenação dos registros'
	}
}

export * as swaggerutils from './parametros'