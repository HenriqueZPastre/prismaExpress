import { Router } from 'express'
import { CONTAS } from './src/Controllers/contas'
import { TAGS } from './src/Controllers/tags'
import { LancamentosController } from './src/Controllers/lancamentos'
import { xuxo } from './src/Controllers/xuxo'
import swaggerUi from 'swagger-ui-express'
import swaggerJson from './testeSwagger.json'
import { controllerValores } from './src/Controllers/valores'
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
router.get('/tags', TAGS.listAll)
router.post('/tags', TAGS.create)
router.get('/tags/:id', TAGS.getById)
router.put('/tags/:id', TAGS.editar)
router.delete('/tags/:id', TAGS.excluir)



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

