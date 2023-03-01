import { PrismaClient } from "@prisma/client"
import { createTipoLancamento } from "src/models/tipoLancamento"

const prisma = new PrismaClient()
export const tlAdd = async (objeto: createTipoLancamento) => {
	const exist = await prisma.tiposLancamentos.findFirst({
		where: {
			nome: objeto.nome,
			deletede_at: null
		}
	})

	if (exist) {
		console.log('Esse tipo de lançamento já existe no banco =', objeto.nome)
		return
	}

	await prisma.tiposLancamentos.create({
		data: objeto
	})
}

//TIPAGEM DO PROPRIO PRISMA MODO DE UTILIZAR
/* export const tipo1: Prisma.TiposLancamentosCreateInput = {
	Nome: "AAA"
} */

const a: createTipoLancamento = {
	id: 0,
	nome: "Receita"
}

const b: createTipoLancamento = {
	id: 1,
	nome: "Despesa"
}


export const tiposLancamentosInsert = () => {
	tlAdd(a)
	tlAdd(b)
}

tiposLancamentosInsert()



