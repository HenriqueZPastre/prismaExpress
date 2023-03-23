import { Response } from "express"

type tipo = 'Erro' | 'Sucesso'

/**
 * Recebe e retorna um Response do Express 
 * 
 * StatusCode da request
 * 
 * Em caso de passar uma mensagem Tipo = "ERRO" | "MENSAGEM"
 * 
 * O Campo mensagem aceita string | object | object[ ]
 */
export const HandleResponse = (response: Response, statusCode: number, tipo?: tipo, message?: string | object | object[]): Response => {
	let texto
	if (tipo != undefined) {
		if (tipo === 'Erro') {
			texto = {
				data: {
					Error: message
				}
			}
		} else {
			texto = {
				data: {
					Message: message
				}
			}
		}
	}
	if (texto) {
		return response.status(statusCode).json(texto)
	} else {
		return response.status(statusCode).json({ data: message })
	}
}