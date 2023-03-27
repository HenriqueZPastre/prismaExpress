import { PrismaClient } from "@prisma/client";
import { HandleResponse } from '../utils/HandleResponse';
import { Request, Response } from "express";
import { has } from "cypress/types/lodash";


const prisma = new PrismaClient()

type queryAll = {
	id: number,
	nome: string
}


type editar = {
	id: string,
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
			return HandleResponse(resp, 404, 'Nenhum resultado econtrado', 'Erro')

		} else {
			return HandleResponse(resp, 200, query)
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
			return HandleResponse(resp, 400, mensagemErro, 'Erro')

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
			return HandleResponse(resp, 400, 'Tag não existe', 'Erro')
		}
	},

	async teste(_req: Request, resp: Response) {

		const t = await prisma.contas.findMany({
			where: {
				deletede_at: null
			}
		})
		return HandleResponse(resp, 200, t)

	},

	async create(req: Request<{ nome: string }>, resp: Response) {
		let { nome } = req.body
		if (!nome) {
			return HandleResponse(resp, 400, 'Nome não informado', 'Erro')
		}
		if (typeof nome !== 'string') {
			nome = nome.toString()
		}
		const tag = await prisma.tags.create({
			select: {
				id: true,
				nome: true
			},
			data: {
				nome: nome
			}
		})
		return HandleResponse(resp, 200, tag)
	},


	async editar(req: Request<{ id: number }, {}, { nome: string }>, resp: Response) {
		let id = Number(req.params.id)
		let nome = String(req.body.nome).trim()

		if (!nome) {
			return HandleResponse(resp, 400, 'Nome não informado', 'Erro')
		}

		const existe = await prisma.tags.findFirst({
			where: {
				id: id,
				deletede_at: null
			},
		})

		if (!existe) {
			return HandleResponse(resp, 400, 'Tag não existe', 'Erro')
		} else {
			await prisma.tags.update({
				data: {
					nome: nome
				},
				where: {
					id: id
				}
			})
			return HandleResponse(resp, 200)
		}
	},

	async getById(req: Request<{ id: string }>, resp: Response) {
		const { id } = req.params
		const tag = await prisma.tags.findFirst({
			select: {
				id: true,
				nome: true,
			},
			where: {
				id: parseInt(id),
				deletede_at: null
			}
		})
		if (!tag) {
			return HandleResponse(resp, 404, 'Tag não encontrada', 'Erro')
		}
		return HandleResponse(resp, 200, tag)
	}

}