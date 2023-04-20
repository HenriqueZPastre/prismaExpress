import fs from 'fs'
import { schema } from './schemas'
import { swaggerPaths } from './paths'

const Swagger = {
	'openapi': '3.0.0',
	'info': {
		'title': 'API prismaExpresss',
		'description': 'API de estudo usando prisma, express, typescript e zod, além do swagger/openapi para documentação.',
		'version': '1.0.0'
	},
	'servers': [
		{
			'url': 'http://localhost:3000',
			'description': 'Quando usado em local'
		},
		{
			'url': 'prismaexpress.fly.dev',
			'description': 'Quando usado em Produção'
		}
	],
	'paths': swaggerPaths,
	'components': {
		'schemas': schema
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const escrever = async () => {
	await fs.writeFileSync('./testeSwagger.json', JSON.stringify(Swagger, null, 2))
}

escrever()
