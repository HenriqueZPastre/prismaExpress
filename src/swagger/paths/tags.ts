import { swaggerUtils } from '../utils/parametros'
import { getSchema } from '../schemas'
import { OpenAPIV3 } from 'openapi-types'

export const tags: OpenAPIV3.PathsObject = {
	'/tags': {
		get: {
			tags: [
				'Tags'
			],
			summary: 'Lista as tags',
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
								$ref: getSchema('listarTags')
							}
						}
					}
				}
			}
		},
		post: {
			tags: [
				'Tags'
			],
			summary: ' Insere uma nova tag',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: getSchema('createTags')
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
								$ref: getSchema('responseCreateTag')
							}
						}
					}
				}
			}
		}
	},
	'/tags/{id}': {
		get: {
			tags: [
				'Tags'
			],
			summary: 'Busca os dados da tag',
			parameters: [
				swaggerUtils.idParameter
			],
			responses: {
				'200': {
					description: 'OK',
					content: {
						'application/json': {
							schema: {
								$ref: getSchema('responseCreateTag')
							}
						}
					}
				}
			}
		},
		put: {
			tags: [
				'Tags'
			],
			summary: 'Atualiza os dados da tag',
			parameters: [
				swaggerUtils.idParameter
			],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: getSchema('editarTags')
						}
					}
				}
			},
			responses: {
				'200': {
					description: 'OK',
				}
			}
		},
		delete: {
			tags: [
				'Tags'
			],
			summary: 'Soft delete da tag',
			parameters: [
				swaggerUtils.idParameter
			],
			responses: {
				'200': {
					description: 'OK',
				}
			}
		}
	},
}