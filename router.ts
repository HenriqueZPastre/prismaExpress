import { Router } from "express";
import { tiposLancamentos } from "./src/controllers/tipoLancamentos";
import { a, xd } from "./src/models/contas";

const router: Router = Router()
export { router };


router.get('/', xd(a,))