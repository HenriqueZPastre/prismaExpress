import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const tlAdd = async (id: number, nome: string) => {
	await prisma.tiposLancamentos.upsert({
		where: { id: id },
		update: {},
		create: {
			Nome: nome,
			id: id
		},
	})
}

export const tiposLancamentosInsert = () => {
	tlAdd(0, 'Receita')
	tlAdd(1, 'Despesa')
}



