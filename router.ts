import { Router } from 'express'
import { CONTAS } from './src/controllers/contas'
import { ControllerTags } from './src/controllers/tags'
import { LancamentosController } from './src/controllers/lancamentos'
import { xuxo } from './src/controllers/xuxo'
import swaggerUi from 'swagger-ui-express'
import swaggerJson from './testeSwagger.json'
import { controllerValores } from './src/controllers/valores'
import { authSwagger } from './src/utils/authSwagger'

const router: Router = Router()
export { router }

router.use('/api-docs', authSwagger, swaggerUi.serve, swaggerUi.setup(swaggerJson))

//*********************************\\
//**** CONTAS BANCÁRIAS ***********\\
//*********************************\\

router.get('/contas', CONTAS.listAll)
router.post('/contas', CONTAS.createConta)
router.get('/contas/:id', CONTAS.getById)
router.put('/contas/:id', CONTAS.editarConta)
router.delete('/contas/:id', CONTAS.deleteConta)

//*********************************\\
//**** TAGS ***********************\\
//*********************************\\
router.get('/tags', ControllerTags.listar)
router.post('/tags', ControllerTags.criar)
router.get('/tags/:id', ControllerTags.buscarPorID)
router.put('/tags/:id', ControllerTags.editar)
router.delete('/tags/:id', ControllerTags.excluir)

//*********************************\\
//**** LANÇAMENTOS ***************\\
//*********************************\\
router.get('/lancamentos', LancamentosController.listAll)
router.post('/lancamentos', LancamentosController.create)
router.get('/lancamentos/:id', LancamentosController.getId)
router.put('/lancamentos/:id', LancamentosController.update)
router.delete('/lancamentos/:id', LancamentosController.delete)

router.get('/valores', controllerValores.getAll)


//*********************************\\
//**** XUXOS/TESTES ***************\\
//*********************************\\
router.get('/a', xuxo.listAll)
router.get('/', xuxo.test)

