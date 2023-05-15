import { Response } from 'express'
import { ZodError } from 'zod'

type ZodGeneric = {
	success?: boolean,
}

interface Meta {
	data?: unknown,
	mensagem?: unknown,
	erro?: unknown,
	zod?: ZodError | unknown
	zodValidate?: ZodGeneric,
	extras?: unknown,
	registros?: unknown,
	paginas?: unknown,
}

function ValidateZodResponse(obj: Meta) {
	return obj?.zodValidate?.success === false ? obj?.zodValidate : undefined
}

function getZodInputErro(obj: Meta) {
	if (obj?.zod !== undefined && obj?.zod instanceof ZodError) {
		obj.zod = `${obj?.zod?.issues[0].path[0]} ${obj?.zod?.issues[0].message.toLowerCase()}`
	}
}

function createResponseObject(obj: Meta): Meta {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { zod, zodValidate, data, erro, extras, mensagem, paginas, registros } = obj
	const zodErrorMessage = getZodInputErro(obj)
	const zodValidateResponse = ValidateZodResponse(obj)
	return {
		data,
		mensagem,
		erro,
		zod: zodErrorMessage,
		zodValidate: zodValidateResponse,
		extras,
		registros,
		paginas,
	}
}

export function HandleResponse(response: Response, statusCode: number, obj: Meta = {}): Response {
	if (obj) {
		const metaObject = createResponseObject(obj)
		return response.status(statusCode).json(metaObject)
	}
	return response.status(statusCode).json()
}
