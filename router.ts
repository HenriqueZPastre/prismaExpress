import { Router } from "express";
import { tiposLancamentos } from "./src/controllers/tipoLancamentos";
import { CONTAS } from "./src/controllers/contas";

const router: Router = Router()
export { router };


router.get('/', tiposLancamentos.getAll)

router.get('/contas', CONTAS.listAll)
router.post('/contas', CONTAS.createConta)
router.delete('/contas/:id', CONTAS.deleteConta)