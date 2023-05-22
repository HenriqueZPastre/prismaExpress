import { Response } from 'express'
import { ZodError } from 'zod'

type ZodGenericoResponse = {
	success?: boolean,
}

interface PossiveisDadosDeResposta {
	data?: unknown,
	mensagem?: unknown,
	erro?: unknown,
	zod?: ZodError | unknown
	zodValidate?: ZodGenericoResponse,
	extras?: unknown,
	registros?: unknown,
	paginas?: unknown,
}

function ZodValidarResponse(obj: PossiveisDadosDeResposta) {
	return obj?.zodValidate?.success === false ? obj?.zodValidate : undefined
}

function ZodTratarMensagemDeErro(obj: PossiveisDadosDeResposta) {
	if (obj?.zod !== undefined && obj?.zod instanceof ZodError) {
		obj.zod = `${obj?.zod?.issues[0].path[0]} ${obj?.zod?.issues[0].message.toLowerCase()}`
	}
}

function MontarDadosDoResponse(obj: PossiveisDadosDeResposta): PossiveisDadosDeResposta {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { zod, zodValidate, data, erro, extras, mensagem, paginas, registros } = obj
	const zodErrorMessage = ZodTratarMensagemDeErro(obj)
	const zodValidateResponse = ZodValidarResponse(obj)
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

interface IHandleResponse {
	main(response: Response, statusCode: number, obj?: PossiveisDadosDeResposta): Response,
}


export const HandleResponse: IHandleResponse = {
	main: (response: Response, statusCode: number, obj: PossiveisDadosDeResposta = {}): Response => {
		if (obj) {
			const PossiveisDadosDeRespostaObject = MontarDadosDoResponse(obj)
			return response.status(statusCode).json(PossiveisDadosDeRespostaObject)
		}
		return response.status(statusCode).json()
	}
}