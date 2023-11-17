import { ZodError, ZodType } from 'zod'
import { Request, Response, } from 'express'
import { HandleResponse } from '../../utils/HandleResponse/HandleResponse'

/**
 * 
 * @param request request da api
 * @param res response da api
 * @param objetoZod objeto zod validador
 * @returns True se sucesso e False se falhar
 */
export const validarZod = async (request: Request, res: Response, objetoZod: ZodType,) => {
	const validar = await objetoZod.safeParse(request.body)
	if (validar.success === false) {
		const tt: ZodError = validar.error
		HandleResponse.main(res, 400, { zodValidate: validar, zod: tt, })
		return false
	}
	return true
}
