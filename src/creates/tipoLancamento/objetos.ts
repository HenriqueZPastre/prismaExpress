import { Prisma, PrismaClient, TiposLancamentos } from "@prisma/client";
import { createTipoLancamento } from "../../models/tipoLancamento";

export const tipo1: createTipoLancamento = {
	Nome: "MEU DEUS222"
}


/* export const tipo1: Prisma.TiposLancamentosCreateInput = {
	Nome: "AAA"
} */

const a = new PrismaClient()

const at = async () => {
	await a.tiposLancamentos.create({
		data: tipo1
		
	})
}

at()
