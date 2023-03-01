import { PrismaClient } from "@prisma/client";
import { createCategorias } from "src/models/categorias";
import { categoriasBase } from "./objetos";

const prisma = new PrismaClient()

const categoriassAdd = async (objeto: createCategorias) => {
	const registroExistente = await prisma.categorias.findFirst({
		where: {
			nome: objeto.nome,
			deletede_at: null
		}
	})

	if (registroExistente) {
		console.log('Já existe a categoria', objeto.nome)
		return
	}
	try {
		await prisma.categorias.create({
			data: objeto
		})
	}catch(e) {
		console.log('Erro com', objeto.nome)
		console.log(e)
	}
	
}

const t = categoriasBase

export const categoriasInsert = () => {
	categoriassAdd(t[0])
	categoriassAdd(t[1])
	categoriassAdd(t[2])
	categoriassAdd(t[3])
	categoriassAdd(t[4])
	categoriassAdd(t[5])
	categoriassAdd(t[6])
	categoriassAdd(t[7])
	categoriassAdd(t[8])
	categoriassAdd(t[9])
}

categoriasInsert()