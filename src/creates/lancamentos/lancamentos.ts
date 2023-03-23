import { PrismaClient } from "@prisma/client";
import { lancamentosData } from "./objetos";
import { createLancamentos } from "src/models/lancamentos";

const prisma = new PrismaClient()

const criarLancamentos = async (objeto: createLancamentos) => {
	const existe = await prisma.lancamentos.findFirst({
		where: {
			nome: objeto.nome,
			deletede_at: null
		}
	})

	const d = new Date()
	const t = d.getMonth()

	if (existe) {
	
		if (existe?.create_at.getMonth() == t) {
			
			return
		}

	}

	await prisma.lancamentos.create({
		data: objeto
	})
}

export const insertLancamentos = () => {
	lancamentosData.forEach((obj) => {
		criarLancamentos(obj)
	})
}

insertLancamentos()