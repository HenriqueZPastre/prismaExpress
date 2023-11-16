import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

export const tokenValidado = async (token: string): Promise<boolean> => {
	const existeToken = await tokenExiste(token)
	if (existeToken) {
		const valido = lerToken(token)
		return valido
	} else {
		return false
	}
}

export const tokenExiste = async (token: string): Promise<boolean> => {
	const prisma = new PrismaClient()

	const existeToken = await prisma.clientes.findFirst({
		where: {
			token: token
		}
	})

	await prisma.$disconnect()

	if (existeToken) {
		return true
	} else {
		return false
	}
}

export const lerToken = async (token: string): Promise<boolean> => {
	const secretKey = process.env.secretJwt
	let valido = false

	if (!secretKey) throw new Error('Chave secreta não definida')
	jwt.verify(token, secretKey, (err: unknown, decoded: unknown) => {
		if (decoded) {
			console.log('decoded', decoded)
			valido = true
		}
		if (err instanceof jwt.TokenExpiredError) {
			console.error('Token expirado')
		} else if (err) {
			console.error('Erro na verificação do JWT:', err)
		} else {
			console.log('JWT verificado com sucesso. Decodificado:', decoded)
		}
	})
	return valido
}

