import { PrismaClient } from "@prisma/client";
import { HandleResponse } from '../utils/HandleResponse';
import { Request, Response } from "express";


const prisma = new PrismaClient()

type queryAll = {
	id: number,
	nome: string
}
export const TAGS = {
	/**
	 * Lista todas as tags ativas do banco
	*/
	async listAll(_req: Request, resp: Response) {
		const query: queryAll[] = await prisma.tags.findMany({
			select: {
				id: true,
				nome: true,
			},
			where: {
				deletede_at: null
			}
		})

		if (query.length < 1) {
			return HandleResponse(resp, 404, 'Erro', {b:'Nenhum resultado econtrado'})

		} else {
			return HandleResponse(resp, 200, undefined, {a:query})
		}
	},


	/**
	 * Valida se existem lançamento com essa tag impedindo a exclusão
	 * 
	 * Se não houverem lançamentos e a tag já não esteja deletada, faz o soft delete.
	 */
	async excluir(req: Request, resp: Response) {
		const tagId = parseInt(req.params.id)
		const numLancamentos = await prisma.lancamentos_tags.count({
			where: {
				tagsId: tagId,
			}
		})

		if (numLancamentos > 0) {
			const mensagemErro = `Não é possível excluir a tag com ID ${tagId} porque há ${numLancamentos} lançamentos associados a ela.`
			return HandleResponse(resp, 400, 'Erro', {b:mensagemErro})

		} else {
			const existe = await prisma.tags.findFirst({
				where: {
					id: tagId,
					deletede_at: null
				}
			})
			if (existe) {
				await prisma.tags.update({
					data: {
						deletede_at: new Date()
					},
					where: {
						id: tagId,
					}
				})
				return HandleResponse(resp, 200)
			}
			return HandleResponse(resp, 400, 'Erro', {b:'Tag não existe'})
		}
	},

	async teste(_req: Request, resp: Response) {

		const t = await prisma.contas.findMany({

			where: {
				deletede_at: null
			}
		})

		return HandleResponse(resp, 200, 'Sucesso', { a: t, b:'teste'})
	}
}