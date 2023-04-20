import { getSchema } from './schemas'
import { OpenAPIV3 } from 'openapi-types'
interface testeParams {
	name: OpenAPIV3.ParameterObject['name'],
	in: OpenAPIV3.ParameterObject['in'],
	required?: OpenAPIV3.ParameterBaseObject['required'],
	schema: OpenAPIV3.ParameterBaseObject['schema'],
	description?: OpenAPIV3.ParameterBaseObject['description'],
}
const justID: testeParams = {
	name: 'id',
	in: 'path',
	required: true,
	schema: {
		type: 'integer'
	},
	description: 'Id da conta',
}

export const contas: OpenAPIV3.PathsObject = {
	'/contas': {
		get: {
			tags: [
				'Contas'
			],
			summary: 'Lista todas as contas',
			responses: {
				'200': {
					description: 'OK',
					content: {
						'application/json': {
							schema: {
								$ref: getSchema('listarContas')
							}
						}
					}
				}
			},
		},
		post: {
			tags: [
				'Contas'
			],
			summary: ' Insere uma nova conta',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: getSchema('createContas')
						}
					}
				}
			},
			responses: {
				'201': {
					description: 'Created',
					content: {
						'application/json': {
							schema: {
								$ref: getSchema('responseCreateConta')
							}
						}
					}
				}
			}
		}
	},
	'/contas/{id}': {
		get: {
			tags: [
				'Contas'
			],
			summary: 'Busca os dados de uma conta',
			parameters: [
				justID
			],
			responses: {
				'200': {
					description: 'OK',
					content: {
						'application/json': {
							schema: {
								$ref: getSchema('getConta')
							}
						}
					}
				}
			},
		},
		delete: {
			tags: [
				'Contas'
			],
			summary: 'Soft delete da conta',
			parameters: [
				justID,
			],
			responses: {
				'204': {
					description: 'No Content',
				}
			}
		}
	}
}
