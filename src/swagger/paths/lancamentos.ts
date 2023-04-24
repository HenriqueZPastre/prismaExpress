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
				swaggerUtils.orderBy(ModelLancamentos.zodLancamentos.responseCreate.shape)
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