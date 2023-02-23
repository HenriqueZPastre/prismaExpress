import { PrismaClient } from "@prisma/client";
import express, { Router } from "express";
import { tiposLancamentos } from "./controllers/tipoLancamentos";

const router: Router = Router()
export { router };


router.get('/', tiposLancamentos.getAll)