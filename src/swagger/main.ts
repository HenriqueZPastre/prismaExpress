import fs from 'fs'
import { schema } from './schemas'
import { contas } from './contas'

const Swagger = {
	'openapi': '3.0.0',
	'info': {
		'title': 'API de Exemplo',
		'description': 'API para demonstração',
		'version': '1.0.0'
	},
	'servers': [
		{
			'url': 'http://localhost:3000',
			'description': 'Servidor de Desenvolvimento'
		}
	],
	'paths': contas,
	'components': {
		'schemas': schema
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const escrever = async () => {
	await fs.writeFileSync('./testeSwagger.json', JSON.stringify(Swagger, null, 2))
}

escrever()