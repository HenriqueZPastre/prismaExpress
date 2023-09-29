import express from 'express'
import { Bancos } from '../controllers/bancos/bancos'
import { authSwagger } from '../middlewares/autenticacao/authSwagger'

const routerBancos = express.Router()

/* routerBancos.get('/bancos', Bancos.listarBancos)
routerBancos.post('/bancos', Bancos.cadastrarBancos) */
routerBancos.route('/bancos')
	.get(Bancos.listarBancos)
	.post(Bancos.cadastrarBancos)

routerBancos.get('/bancos/:id', authSwagger, Bancos.getId)

export { routerBancos }