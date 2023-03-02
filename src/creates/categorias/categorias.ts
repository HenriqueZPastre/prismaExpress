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
	} catch (e) {
		console.log('Erro com', objeto.nome)
		console.log(e)
	}

}

export const categoriasInsert = () => {
	categoriasBase.forEach(obj => {
		categoriassAdd(obj)
	})
}

categoriasInsert()