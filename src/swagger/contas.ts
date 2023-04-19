import { getSchema } from './schemas'
import { OpenAPIV3 } from 'openapi-types'

export const contas: OpenAPIV3.PathsObject = {
	'/contas': {
		get: {
			tags: [
				'Contas'
			],
			summary: 'Lista todas as contas',
			responses: {
				'200': {
					description: 'Lista de contas',
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
				'200': {
					description: 'Conta inserida com sucesso',
				}
			}
		}
	},
	'/contas/{id}': {
		get: {
			tags: [
				'Contas'
			],
			summary: 'Lista todas as contas',
			parameters: [
				{
					name: 'id',
					in: 'path',
					required: true,
					schema: {
						type: 'integer'
					},
					description: 'Id da conta',
				}
			],
			responses: {
				'200': {
					description: 'Lista de contas',
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
	}
}
