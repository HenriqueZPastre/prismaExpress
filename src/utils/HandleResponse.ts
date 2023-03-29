import { Response } from "express"

type Meta = {
	response?: any,
	mensagem?: any,
	erro?: any,
	paginas?: any,
	registros?: any,
}

/**
 * Recebe e retorna um Response do Express 
 * 
 * StatusCode da request
 * 
 * Em caso de passar uma mensagem Tipo = "ERRO" | "MENSAGEM"
 * 
 * O Campo mensagem aceita string | object | object[ ]
 */
export const HandleResponse = (response: Response, statusCode: number, obj?: Meta): Response => {
	const registros = obj?.registros
	const paginas = obj?.paginas
	const erro = obj?.erro
	const mensagem = obj?.mensagem

	if (obj?.response) {
		return response.status(statusCode).json({ data: obj.response, registros, paginas, erro, mensagem })
	} 
	if (obj) {
		return response.status(statusCode).json({ registros, paginas, erro, mensagem })
	}
	return response.status(statusCode).json()
}
