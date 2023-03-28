import { Response } from "express"

type tipo = 'Erro' | 'Mensagem'

/**
 * Recebe e retorna um Response do Express 
 * 
 * StatusCode da request
 * 
 * Em caso de passar uma mensagem Tipo = "ERRO" | "MENSAGEM"
 * 
 * O Campo mensagem aceita string | object | object[ ]
 */
export const HandleResponse = (response: Response, statusCode: number, message?: string | object | object[]| number| null, tipo?: tipo,): Response => {
	let texto = { "data": {} }
	if (tipo) {
		if (tipo === 'Erro') {
			texto.data = {
				error: message
			}
		} else {
			texto.data = {
				message: message
			}
		}
		return response.status(statusCode).json(texto)
	}
	if (message) {
		return response.status(statusCode).json({ data: message })
	}
	return response.status(statusCode).json()
}
