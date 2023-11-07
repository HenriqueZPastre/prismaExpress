import express from 'express'
import { Bancos } from '../controllers/bancos/bancos'
import { authSwagger } from '../middlewares/swagger/authSwagger'
import { middlewareValidarJWT } from '../middlewares/jwt/validadorJWT'

const routerBancos = express.Router()



// routerBancos.get('/bancos', Bancos.listarBancos)
// routerBancos.post('/bancos', Bancos.cadastrarBancos) */
routerBancos.route('/bancos')
	.all(middlewareValidarJWT)
	.get(Bancos.listarBancos)
	.post(Bancos.cadastrarBancos)

routerBancos.get('/bancos/:id', authSwagger, Bancos.getId)

//routerBancos.all(authSwagger)

export { routerBancos } 