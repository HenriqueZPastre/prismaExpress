import { swaggerUtils } from './utils/parametros'
import { getSchema } from './schemas'
import { OpenAPIV3 } from 'openapi-types'

export const contas: OpenAPIV3.PathsObject = {
	'/contas': {
		get: {
			tags: [
				'Contas'
			],
			summary: 'Lista as contas',
			parameters: [
				swaggerUtils.Paginator[0],
				swaggerUtils.Paginator[1],
				swaggerUtils.Paginator[2],
			],
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
				swaggerUtils.idParameter
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
		put: {
			tags: [
				'Contas'
			],
			summary: 'Atualiza os dados da conta indicada',
			parameters: [
				swaggerUtils.idParameter,
			],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: getSchema('editarContas')
						}
					}
				}
			},
			responses: {
				'204': {
					description: 'No Content',
				}
			}
		},
		delete: {
			tags: [
				'Contas'
			],
			summary: 'Soft delete da conta',
			parameters: [
				swaggerUtils.idParameter,
			],
			responses: {
				'204': {
					description: 'No Content',
				}
			}
		},
	}
}
