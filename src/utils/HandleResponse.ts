import { Response } from 'express'
import { ZodError } from 'zod'

type Meta = {
	response?: unknown,
	mensagem?: unknown,
	erro?: unknown,
	paginas?: unknown,
	registros?: unknown,
	zod?: ZodError
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
	if (obj?.zod !== undefined) {
		const zod = obj?.zod?.issues[0].path[0] + ' ' + obj?.zod?.issues[0].message.toLowerCase()
		const extra = obj?.zod
		return response.status(statusCode).json({ registros, paginas, erro, mensagem, zod , extra})
	}
	if (obj?.response) {
		return response.status(statusCode).json({ data: obj.response, registros, paginas, erro, mensagem })
	}
	if (obj) {
		return response.status(statusCode).json({ registros, paginas, erro, mensagem, })
	}
	return response.status(statusCode).json()
}


