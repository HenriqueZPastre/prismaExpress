import { Router } from "express";
import { tiposLancamentos } from "./src/controllers/tipoLancamentos";
import { CONTAS } from "./src/controllers/contas";
import { TAGS } from "./src/controllers/tags";

const router: Router = Router()
export { router };


router.get('/', tiposLancamentos.getAll)

router.get('/contas', CONTAS.listAll)
router.post('/contas', CONTAS.createConta)
router.delete('/contas/:id', CONTAS.deleteConta)
router.put('/contas/:id', CONTAS.editarConta)

router.get('/tags', TAGS.listAll)
router.delete('/tags/:id', TAGS.excluir)
router.get('/tagss', TAGS.teste)