import { PrismaClient } from "@prisma/client";
import { createEnvolvidos } from "src/models/envolvidos";
import { envolvidos } from "./objetos";

const prisma = new PrismaClient()

const criarEnvolvidos = async (objeto: createEnvolvidos) => {
	const existe = await prisma.envolvidos.findFirst({
		where: {
			nome: objeto.nome,
			deletede_at: null
		}
	})

	if (existe) {
		console.log('O registro do envolvido:', objeto.nome, 'já existe')
		return
	}

	await prisma.envolvidos.create({
		data: objeto
	})
}

export const insertEnvolvidos = () => {
	envolvidos.forEach((obj) => {
		criarEnvolvidos(obj)
	})
}

insertEnvolvidos()