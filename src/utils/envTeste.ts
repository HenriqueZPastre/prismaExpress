import * as dotenv from 'dotenv'
import fs from 'fs'
const envFile = process.env.NODE_ENV === 'teste' ? 'teste' : '.env'
export const envTeste = () => {
	if (process.env.NODE_ENV === 'teste') {
		try {
			const secretPath = '/run/secrets/DATABASE_URL' // Caminho para o segredo no contêiner
			const secret = fs.readFileSync(secretPath, 'utf8')
			process.env.DATABASE_URL = secret
			console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`)
		} catch (err) {
			console.error('Erro ao ler o segredo:', err)
		}
		
	}
	dotenv.config({ path: envFile })
}