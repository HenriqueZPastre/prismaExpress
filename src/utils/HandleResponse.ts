import { Response } from 'express'
import { ZodError } from 'zod'

type generic = {
	success?: boolean,
}

type Meta = {
	zodValidate?: generic,
	extras?: unknown,
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
	const zodValidate = obj?.zodValidate?.success === false ? obj?.zodValidate : undefined
	const extras = obj?.extras
	if (obj?.zod !== undefined) {
		const zod = obj?.zod?.issues[0].path[0] + ' ' + obj?.zod?.issues[0].message.toLowerCase()
		const extraZod = obj?.zod
		return response.status(statusCode).json({ registros, paginas, erro, mensagem, zod, extraZod, zodValidate, extras })
	}
	if (obj?.response) {
		return response.status(statusCode).json({ data: obj.response, registros, paginas, erro, mensagem, zodValidate, extras })
	}
	if (obj) {
		return response.status(statusCode).json({ registros, paginas, erro, mensagem, zodValidate, extras })
	}
	return response.status(statusCode).json()
}


