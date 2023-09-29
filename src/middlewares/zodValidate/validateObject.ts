import { ZodType } from 'zod'
import { zodBancos } from '../../models/bancos/bancos'
import { NextFunction, Request, Response, response } from 'express'
import { HandleResponse } from 'src/utils/HandleResponse/HandleResponse'

console.log(zodBancos.create.safeParse({ nome: 'teste' }))

const validar = (objeto: ZodType, request: Request, next: NextFunction): Response | NextFunction => {
	const nextFunction = next
	const res : Response = {} as Response
	const validar = objeto.safeParse(request.body.data)
	if (validar.success === false) {
		return HandleResponse.main( res, 400, { zodValidate: validar })
	}
	next()
	nextFunction()

}

//validar(zodBancos.create)
