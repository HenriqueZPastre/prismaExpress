import { OpenAPIV3 } from 'openapi-types'
import { TodosOsParametrosDoPaginator } from 'src/utils/Paginator/Paginator'


const p: TodosOsParametrosDoPaginator = {
	page: undefined,
	all: undefined,
	take: undefined,
	order: undefined,
	coluna: undefined,
}
const params = Object.keys(p)

export interface ParametersCustomSwagger {
	name: OpenAPIV3.ParameterObject['name'],
	in: OpenAPIV3.ParameterObject['in'],
	required?: OpenAPIV3.ParameterBaseObject['required'],
	schema: OpenAPIV3.ParameterBaseObject['schema'],
	examples?: OpenAPIV3.ParameterBaseObject['examples'],
	description?: OpenAPIV3.ParameterBaseObject['description'],
}

export const id: ParametersCustomSwagger = {
	name: 'id',
	in: 'path',
	required: true,
	schema: {
		type: 'integer'
	},
	description: 'Id do registro',
}

export const Paginator: ParametersCustomSwagger[] = [
	{
		name: params[0],
		in: 'path',
		required: true,
		schema: {
			type: 'integer',
		},
		description: 'Página atual desejada, se for undefined pega a pagina 1'
	},
	{
		name: params[1],
		in: 'path',
		schema: {
			type: 'boolean'
		},
		description: 'Se for true, retorna todos os registros.'
	},
	{
		name: params[2],
		in: 'path',
		schema: {
			type: 'integer'
		},
		description: 'Quantidade de registros por página (default 15)'
	},
	{
		name: params[3],
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
]

export const colunas = (objeto: object): OpenAPIV3.ParameterObject => {
	const keys = Object.keys(objeto)
	return {
		name: params[4],
		in: 'path',
		schema: {
			type: 'string',
			enum: keys
		},
		description: 'Colunas para ordenação dos registros'
	}
}

export * as swaggerUtils from './parametros'