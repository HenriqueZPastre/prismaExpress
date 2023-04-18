import { Request, Response, NextFunction } from 'express'

export function authSwagger(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		res.setHeader('WWW-Authenticate', 'Basic realm="API Access"')
		res.sendStatus(401)
		return
	}

	const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii')

	if (credentials !== 'teste:teste') {
		res.setHeader('WWW-Authenticate', 'Basic realm="API Access"')
		res.sendStatus(401)
		return
	}

	next()
}