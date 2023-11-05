import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
dotenv.config()
// Chave secreta para assinar o JWT

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

lerToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6InRlc3RlIiwiZW1haWwiOiJ0ZXN0ZUB1b3Jhay5jb20iLCJ0ZWxlZm9uZSI6bnVsbCwidXBkYXRlX2F0IjoiMjAyMy0xMS0wNVQwMTowNDoyMS4zNjJaIiwiY3JlYXRlX2F0IjoiMjAyMy0xMC0yMFQxMzoyNTowOC43MTJaIiwiZGVsZXRlZGVfYXQiOm51bGwsImlhdCI6MTY5OTE0NzEzOSwiZXhwIjoxNjk5MTc3MTM5fQ.-zlq1d_PgNjS6PlwEJOcKhYuw-PF1K8jKZzroQBz_l8')