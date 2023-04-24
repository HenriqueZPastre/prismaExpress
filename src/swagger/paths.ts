import { contas } from './paths/contas'
import { Lancamentos } from './paths/lancamentos'
import { tags } from './paths/tags'

export const swaggerPaths = {
	'/contas': contas['/contas'],
	'/contas/{id}': contas['/contas/{id}'],

	'/tags': tags['/tags'],
	'/tags/{id}': tags['/tags/{id}'],

	'/lancamentos': Lancamentos['/lancamentos']

}