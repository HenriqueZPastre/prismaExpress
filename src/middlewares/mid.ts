import { Request, Response, NextFunction } from 'express'
import { tokenValidado } from './jwt/validarJWT'

export const testeIF = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization

	if (!token) {
		res.sendStatus(401)
		return
	}
	const existe = await tokenValidado(token)
	existe ? next() : res.sendStatus(401)
	
}