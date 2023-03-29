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
			return HandleResponse(resp, 404, { erro: 'Nenhum resultado econtrado' },)

		} else {
			return HandleResponse(resp, 200, { response: query })
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
			return HandleResponse(resp, 400, { erro: mensagemErro },)

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
			return HandleResponse(resp, 400, { erro: 'Tag não existe' },)
		}
	},


	async create(req: Request<{ nome: string }>, resp: Response) {
		let { nome } = req.body
		if (!nome) {
			return HandleResponse(resp, 400, { erro: 'Nome não informado' },)
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
		return HandleResponse(resp, 200, { response: tag })
	},


	async editar(req: Request<{ id: number }, {}, { nome: string }>, resp: Response) {
		let id = Number(req.params.id)
		let nome = String(req.body.nome).trim()

		if (!nome) {
			return HandleResponse(resp, 400, { erro: 'Nome não informado' })
		}

		const existe = await prisma.tags.findFirst({
			where: {
				id: id,
				deletede_at: null
			},
		})

		if (!existe) {
			return HandleResponse(resp, 400, { erro: 'Tag não existe' },)
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
			return HandleResponse(resp, 404, { erro: 'Tag não encontrada' },)
		}
		return HandleResponse(resp, 200, { response: tag })
	},

	async teste(_req: Request, resp: Response) {
		const te = await prisma.contas.findMany({
			where: {
				deletede_at: null
			},
			take: 3

		})
		const t = await prisma.contas.count({
			where: {
				deletede_at: null
			}
		})
		const erro = 'TUDO ERRADO CARA'
		return HandleResponse(resp, 200, { response: te, registros: t, erro: erro, mensagem: 'Sucesso', paginas: 1 })
	},
}