import { swaggerutils } from '../utils/parametros'
import { refSchema } from '../schemas'
import { OpenAPIV3 } from 'openapi-types'
import { ModelLancamentos } from '../../models/lancamentos'

export const Lancamentos: OpenAPIV3.PathsObject = {
	'/lancamentos': {
		get: {
			tags: [
				'Lancamentos'
			],
			summary: 'Lista os lancamentos',
			parameters: [
				swaggerutils.Paginator.all,
				swaggerutils.Paginator.order,
				swaggerutils.Paginator.page,
				swaggerutils.Paginator.take,
				swaggerutils.colunas(ModelLancamentos.zodLancamentos.responseCreate.shape)
			],
			responses: {
				'200': {
					description: 'OK',
					content: {
						'application/json': {
							schema: {
								$ref: refSchema('listarLancamentos')
							}
						}
					}
				}
			}
		},
		post: {
			tags: [
				'Lancamentos'
			],
			summary: 'Cria um novo lancamento',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: refSchema('createLancamentos')
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
		},
	},
	'/lancamentos/{id}': {
		get: {
			tags: [
				'Lancamentos'
			],
			summary: 'Busca um lancamento',
			parameters: [
				swaggerutils.id
			],
			responses: {
				'200': {
					description: 'OK',
					content: {
						'application/json': {
							schema: {
								$ref: refSchema('createLancamentos')
							}
						}
					}
				}
			}

		},
		put: {
			tags: [
				'Lancamentos'
			],
			summary: 'Atualiza um lancamento',
			parameters: [
				swaggerutils.id
			],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: refSchema('editarLancamentos')
						}
					}
				}
			},
			responses: {
				'200': {
					description: 'OK',
					content: {
						'application/json': {
							schema: {
								$ref: refSchema('createLancamentos')
							}
						}
					}
				}
			}
		},
		delete: {
			tags: [
				'Lancamentos'
			],
			summary: 'Deleta um lancamento',
			parameters: [
				swaggerutils.id
			],
			responses: {
				'204': {
					description: 'No Content'
				}
			}
		}
	}
}