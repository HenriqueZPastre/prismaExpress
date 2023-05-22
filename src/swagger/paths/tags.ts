
import { swaggerUtils } from '../utils/parametros'
import { refSchema } from '../schemas'
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
								$ref: refSchema('listarTags')
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
							$ref: refSchema('createTags')
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
								$ref: refSchema('responseCreateTag')
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
				swaggerUtils.id
			],
			responses: {
				'200': {
					description: 'OK',
					content: {
						'application/json': {
							schema: {
								$ref: refSchema('responseCreateTag')
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
				swaggerUtils.id
			],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: refSchema('editarTags')
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
				swaggerUtils.id
			],
			responses: {
				'200': {
					description: 'OK',
				}
			}
		}
	},
}