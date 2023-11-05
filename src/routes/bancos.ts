import express from 'express'
import { Bancos } from '../controllers/bancos/bancos'
import { authSwagger } from '../middlewares/swagger/authSwagger'
import { testeIF } from '../../src/middlewares/mid'

const routerBancos = express.Router()



// routerBancos.get('/bancos', Bancos.listarBancos)
// routerBancos.post('/bancos', Bancos.cadastrarBancos) */
routerBancos.route('/bancos')
	.all(testeIF)
	.get(Bancos.listarBancos)
	.post(Bancos.cadastrarBancos)

routerBancos.get('/bancos/:id', authSwagger, Bancos.getId)

//routerBancos.all(authSwagger)

export { routerBancos } 