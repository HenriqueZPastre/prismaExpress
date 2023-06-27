import { swaggerutils } from '../utils/parametros'
import { refSchema } from '../schemas'
import { OpenAPIV3 } from 'openapi-types'

export const contas: OpenAPIV3.PathsObject = {
	'/contas': {
		get: {
			tags: [
				'Contas'
			],
			summary: 'Lista as contas',
			parameters: [
				swaggerutils.Paginator.page,
				swaggerutils.Paginator.all,
				swaggerutils.Paginator.take,
			],
			responses: {
				'200': {
					description: 'OK',
					content: {
						'application/json': {
							schema: {
								$ref: refSchema('listarContas')
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
							$ref: refSchema('createContas')
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
								$ref: refSchema('responseCreateConta')
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
				swaggerutils.id
			],
			responses: {
				'200': {
					description: 'OK',
					content: {
						'application/json': {
							schema: {
								$ref: refSchema('getConta')
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
				swaggerutils.id,
			],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: refSchema('editarContas')
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
				swaggerutils.id,
			],
			responses: {
				'204': {
					description: 'No Content',
				}
			}
		},
	}
}
