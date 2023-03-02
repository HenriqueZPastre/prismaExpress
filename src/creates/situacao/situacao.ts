import { PrismaClient } from "@prisma/client"
import { createSituacao } from "src/models/situacao"
import { situacoesData } from "./objetos"

const prisma = new PrismaClient()
export const situacaoAdd = async (objeto: createSituacao) => {
	const registroExistente = await prisma.situacao.findFirst({
		where: {
			nome: objeto.nome,
			deletede_at: null
		}
	})

	if (registroExistente) {
		console.log('Já existe a situação', objeto.nome)
		return
	}

	await prisma.situacao.create({
		data: objeto
	})
}

export const insertSituacao = () => {
	situacoesData.forEach(obj => {
		situacaoAdd(obj)
	})
}

insertSituacao()