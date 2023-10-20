import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
dotenv.config()
// Chave secreta para assinar o JWT
const secretKey = process.env.secretJwt
const prisma = new PrismaClient()
// Dados do usuário
export const getTokenUser = async (token: string) => {

	const tokenExiste = await prisma.clientes.findFirst({
		where: {
			token: token
		}
	})

	if (secretKey && tokenExiste?.token) {

		jwt.verify(tokenExiste.token, secretKey, (err: any, decoded: any) => {
			if (err instanceof jwt.TokenExpiredError) {
				console.error('Token expirado')
			} else if (err) {
				console.error('Erro na verificação do JWT:', err)
			} else {
				console.log('JWT verificado com sucesso. Decodificado:', decoded)
			}
		})
	} else {
		console.error('Secret not found')
	}
}

getTokenUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6InRlc3RlIiwiZW1haWwiOiJ0ZXN0ZUB1b3Jhay5jb20iLCJ0ZWxlZm9uZSI6bnVsbCwidXBkYXRlX2F0IjoiMjAyMy0xMC0yMFQxNDowNDoyNS4yMTBaIiwiY3JlYXRlX2F0IjoiMjAyMy0xMC0yMFQxMzoyNTowOC43MTJaIiwiZGVsZXRlZGVfYXQiOm51bGwsImlhdCI6MTY5NzgxMDY5NCwiZXhwIjoxNjk3ODEwOTk0fQ.6cfqDD5HNiG7CTSWMgOutJsPoe6RLACDNVSvCkCCFmE')