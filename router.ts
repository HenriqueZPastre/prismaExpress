import { Router } from "express";
import { tiposLancamentos } from "./src/controllers/tipoLancamentos";

const router: Router = Router()
export { router };


router.get('/', tiposLancamentos.getAll)