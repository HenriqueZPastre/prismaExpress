import { any } from "cypress/types/bluebird"
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
export const HandleResponse = (response: Response, statusCode: number, message?: string | object | object[]| number, tipo?: tipo,): Response => {
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


//EXEMPLO DE OUTRA FUNÇÂO
/* export type ost = {
	response: Response,
	statusCode: number,
	tipo?: 'Erro' | 'Mensagem',
	message?: string,
	objeto?: object[]
}
export const testex = (params: ost): Response => {
	let data = {
		data: [{}],
		message: '',
		error: ''
	}
	if (params.objeto) {
		data.data = params.objeto
	}
	if (params.message && params.tipo) {
		if (params.tipo === 'Erro') {
			data.error = params.message
		} else {
			data.message = params.message
		}
	}
	return params.response.status(params.statusCode).json(data)
} */
