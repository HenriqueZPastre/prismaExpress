import { Router } from 'express'
import { CONTAS } from './src/controllers/contas'
import { ControllerTags } from './src/controllers/tags/tags'
import { LancamentosController } from './src/controllers/lancamentos'
import { xuxo } from './src/controllers/xuxo'
import swaggerUi from 'swagger-ui-express'
import swaggerJson from './testeSwagger.json'
import { controllerValores } from './src/controllers/valores'
import { authSwagger } from './src/middlewares/swagger/authSwagger'
import { routerBancos } from './src/routes/bancos'

const routerMain: Router = Router()
export { routerMain }

routerMain.use('/api-docs', authSwagger, swaggerUi.serve, swaggerUi.setup(swaggerJson))

//*********************************\\
//**** BANCOS ***********\\
//*********************************\\
/* 
router.get('/bancos', Bancos.listarBancos)
router.post('/bancos', Bancos.cadastrarBancos) */

routerMain.use(routerBancos)
//*********************************\\
//**** CONTAS BANCÁRIAS ***********\\
//*********************************\\

routerMain.get('/contas', CONTAS.listAll)
routerMain.post('/contas', CONTAS.createConta)
routerMain.get('/contas/:id', CONTAS.getById)
routerMain.put('/contas/:id', CONTAS.editarConta)
routerMain.delete('/contas/:id', CONTAS.deleteConta)

//*********************************\\
//**** TAGS ***********************\\
//*********************************\\
routerMain.get('/tags', ControllerTags.listar)
routerMain.post('/tags', ControllerTags.criar)
routerMain.get('/tags/:id', ControllerTags.buscarPorID)
routerMain.put('/tags/:id', ControllerTags.editar)
routerMain.delete('/tags/:id', ControllerTags.excluir)

//*********************************\\
//**** LANÇAMENTOS ***************\\
//*********************************\\
routerMain.get('/lancamentos', LancamentosController.listAll)
routerMain.post('/lancamentos', LancamentosController.create)
routerMain.get('/lancamentos/:id', LancamentosController.getId)
routerMain.put('/lancamentos/:id', LancamentosController.update)
routerMain.delete('/lancamentos/:id', LancamentosController.delete)

routerMain.get('/valores', controllerValores.getAll)


//*********************************\\
//**** XUXOS/TESTES ***************\\
//*********************************\\
routerMain.get('/a', xuxo.listAll)
routerMain.get('/', xuxo.test)
routerMain.post('/c', xuxo.ofx )
routerMain.get('/base64image', xuxo.base64teste )


