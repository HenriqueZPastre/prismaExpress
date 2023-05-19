import { swaggerUtils } from '../utils/parametros'
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
				swaggerUtils.Paginator[0],
				swaggerUtils.Paginator[1],
				swaggerUtils.Paginator[2],
				swaggerUtils.Paginator[3],
				swaggerUtils.colunas(ModelLancamentos.zodLancamentos.responseCreate.shape)
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
				swaggerUtils.id
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
		put : {
			tags: [
				'Lancamentos'
			],
			summary: 'Atualiza um lancamento',
			parameters: [
				swaggerUtils.id
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
				swaggerUtils.id
			],
			responses: {
				'204': {
					description: 'No Content'
				}
			}
		}
	}
}