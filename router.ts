import { Router } from 'express'

import { CONTAS } from './src/controllers/contas'
import { TAGS } from './src/controllers/tags'
import { LancamentosController } from './src/controllers/lancamentos'
import { xuxo } from './src/controllers/xuxo'

const router: Router = Router()
export { router }

//*********************************\\
//**** CONTAS BANCÁRIAS ***********\\
//*********************************\\
router.get('/contas', CONTAS.listAll)
router.get('/contas/:id', CONTAS.getById)
router.post('/contas', CONTAS.createConta)
router.put('/contas/:id', CONTAS.editarConta)
router.delete('/contas/:id', CONTAS.deleteConta)

//*********************************\\
//**** TAGS ***********************\\
//*********************************\\
router.get('/tags', TAGS.listAll)
router.get('/tags/:id', TAGS.getById)
router.post('/tags', TAGS.create)
router.put('/tags/:id', TAGS.editar)
router.delete('/tags/:id', TAGS.excluir)



//*********************************\\
//**** LANÇAMENTOS ***************\\
//*********************************\\
router.get('/lancamentos', LancamentosController.listAll)
router.post('/lancamentos', LancamentosController.create)
router.delete('/lancamentos/:id', LancamentosController.delete)

//*********************************\\
//**** XUXOS/TESTES ***************\\
//*********************************\\
router.get('/a', xuxo.listAll)
router.get('/', xuxo.test)



  

  