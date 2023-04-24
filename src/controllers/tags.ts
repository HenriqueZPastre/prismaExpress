import { PrismaClient } from '@prisma/client'
import { HandleResponse } from '../utils/HandleResponse'
import { Response } from 'express'
import { ParamsId } from '../utils/paramsId'
import { ModelTAG } from '../models/tags'
import { ZodError } from 'zod'
import { ErrorGenerico } from '../utils/erroGenerico'
import { PAGINATOR } from '../utils/Paginator'

const prisma = new PrismaClient()

type queryAll = {
	id: number,
	nome: string
}

export const TAGS = {
	/**
	 * Lista todas as tags ativas do banco
	*/
	async listAll(_req: PAGINATOR.Paginator, resp: Response) {
		const { take, skip } = PAGINATOR.main(_req.query)
		const query: queryAll[] = await prisma.tags.findMany({
			select: {
				id: true,
				nome: true,
			},
			where: {
				deletede_at: null
			},
			take: take,
			skip: skip,
		})
		try {
			const validar = await ModelTAG.zodTag.listar.safeParse(query)
			if (query.length < 1) {
				return HandleResponse(resp, 404, { erro: 'Nenhum resultado econtrado' },)
			} else {
				return HandleResponse(resp, 200, { response: query, zodValidate: validar })
			}
		} catch (error) {
			if (error instanceof ZodError) {
				return HandleResponse(resp, 400, { zod: error },)
			}
			return HandleResponse(resp, 400, { erro: 'Erro ao listar tags', response: error })
		}
	},

	/**
	 * Valida se existem lançamento com essa tag impedindo a exclusão
	 * 
	 * Se não houverem lançamentos e a tag já não esteja deletada, faz o soft delete.
	 */
	async excluir(req: ParamsId.RequestParamsId, resp: Response) {
		const tagId = parseInt(req.params.id)
		try {
			const numeroDeLancamentos = await prisma.lancamentos_tags.count({
				where: {
					tagsId: tagId,
					tags: {
						deletede_at: null
					}
				}
			})
			if (numeroDeLancamentos > 0) {
				const mensagemErro = `Não é possível excluir a tag com ID ${tagId} porque há ${numeroDeLancamentos} lançamentos associados a ela.`
				return HandleResponse(resp, 400, { erro: mensagemErro },)
			} else {
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
		} catch (error) {
			return HandleResponse(resp, 400, { erro: `Tag com id ${tagId} não encontrada`, extras: error },)
		}
	},

	async create(req: ModelTAG.Tag, resp: Response) {
		try {
			const { nome } = ModelTAG.zodTag.tag.parse(req.body)
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
		} catch (error) {
			if (error instanceof ZodError) {
				return HandleResponse(resp, 400, { zod: error, extras: error })
			}
			return HandleResponse(resp, 400, { erro: error })
		}
	},


	async editar(req: ModelTAG.TagEditar, resp: Response) {
		const id = parseInt(req.params.id)
		try {
			const { nome } = ModelTAG.zodTag.tag.parse(req.body)
			const existe = await prisma.tags.findFirst({
				where: {
					id: id,
					deletede_at: null
				},
			})
			if (!existe) {
				return HandleResponse(resp, 400, { erro: 'Tag não existe' },)
			} else {
				const update = await prisma.tags.update({
					select: {
						id: true,
						nome: true
					},
					data: {
						nome: nome
					},
					where: {
						id: id
					}
				})
				return HandleResponse(resp, 200, { response: update })
			}
		} catch (error) {
			if (error instanceof ZodError) {
				return HandleResponse(resp, 400, { zod: error })
			}
			return HandleResponse(resp, 400, { erro: error })
		}
	},

	async getById(req: ParamsId.RequestParamsId, resp: Response) {
		const id = parseInt(req.params.id)
		const tag = await prisma.tags.findFirst({
			select: {
				id: true,
				nome: true,
			},
			where: {
				id: id,
				deletede_at: null
			}
		})
		if (!tag) {
			return HandleResponse(resp, 404, { erro: 'Tag não encontrada' },)
		}
		return HandleResponse(resp, 200, { response: tag })
	},

	async verificarSeTagExiste(tags: number[]) {
		const existe = await prisma.tags.findMany({
			select: {
				id: true,
			},
			where: {
				deletede_at: null,
				id: {
					in: tags
				}
			}
		})
		const existeArrayId = Array.from(existe, ({ id }) => id)
		tags.forEach((tag) => {
			if (!existeArrayId.includes(tag)) {
				throw ErrorGenerico(`Tag ${tag} não encontrada`)
			}
		})
		if (existe.length < 1) {
			throw ErrorGenerico('Nenhuma tag informada foi encontrada')
		}
		return existe
	}
}
