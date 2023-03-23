import { Prisma, PrismaClient } from "@prisma/client"
import { createContas } from "src/models/contas"

const prisma = new PrismaClient()
export const contasAdd = async (objeto: createContas) => {
	const registroExistente = await prisma.contas.findFirst({
		where: {
			nome: objeto.nome,
			deletede_at: null
		}
	})

	if (registroExistente) {
		return
	}

	await prisma.contas.create({
		data: objeto
	})

}

const a: createContas = {
	id: 1,
	nome: "Alelo",
	saldoInicial: 169.63,
	saldoAtual: 169.63,
}

const b: createContas = {
	id: 0,
	nome: "Sicredi",
	saldoInicial: 2050.37,
	saldoAtual: 2050.37,
}

const c: createContas = {
	id: 2,
	nome: "Nubank",
	saldoInicial: 0,
	saldoAtual: 0,
}

export const contasInsert = () => {
	contasAdd(a)
	contasAdd(b)
	contasAdd(c)
}





