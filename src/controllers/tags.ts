import { HandleResponse } from '../utils/HandleResponse/HandleResponse'
import { Response } from 'express'
import { ParametroID } from '../utils/parametroID'
import { ZodError, z } from 'zod'
import { ErrorGenerico } from '../utils/HandleResponse/erroGenerico'
import { IRequestPaginator } from '../utils/Paginator/Paginator'
import { serviceTags } from '../Repositories/Tags/ServiceTags'
import { PrismaClient } from '@prisma/client'
import { zodTag } from '../models/tags/tags'
import { ITag, ITagEditar, } from '../models/tags/tags.interface'

const prisma = new PrismaClient()

export const ControllerTags = {
	async listar(req: IRequestPaginator, resp: Response) {
		try {
			const { consulta, erro } = await serviceTags.listarTodas(req.query)
			if (erro) {
				return HandleResponse.main(resp, 400, { erro: 'Erro ao listar tags', data: erro })
			}
			const validar = await z.array(zodTag.listar).safeParse(consulta)
			if (consulta != null && consulta.length < 1) {
				return HandleResponse.main(resp, 404, { mensagem: 'Nenhum resultado encontrado' },)
			} else {
				return HandleResponse.main(resp, 200, { data: consulta, zodValidate: validar })
			}
		} catch (error) {
			if (error instanceof ZodError) {
				return HandleResponse.main(resp, 400, { zod: error },)
			}
			return HandleResponse.main(resp, 400, { erro: 'Erro ao listar tags', data: error })
		}
	},

	async excluir(req: ParametroID.RequestParametroID, resp: Response) {
		try {
			const { qnt, erro } = await serviceTags.verificarAsociacoesDeTag(parseInt(req.params.id))
			if (erro) {
				return HandleResponse.main(resp, 400, { erro: `Tag com id ${req.params.id} não encontrada`, extras: erro })
			}
			if (qnt != null && qnt > 0) {
				const mensagemErro = `Não é possível excluir a tag com ID ${req.params.id} porque há ${qnt} lançamentos associados a ela.`
				return HandleResponse.main(resp, 400, { erro: mensagemErro },)
			} else {
				const { error } = await serviceTags.deletar(parseInt(req.params.id))
				if (error) {
					return HandleResponse.main(resp, 400, { erro: 'Erro ao deletar tag', extras: error },)
				}
				return HandleResponse.main(resp, 204)
			}
		} catch (error) {
			return HandleResponse.main(resp, 400, { erro: 'Erro não mapeado', extras: error },)
		}
	},

	async criar(req: ITag, resp: Response) {
		try {
			zodTag.tag.parse(req.body)
			const { resultado } = await serviceTags.criar(req.body)
			return HandleResponse.main(resp, 200, { data: resultado })
		} catch (error) {
			if (error instanceof ZodError) {
				console.log(error)
				return HandleResponse.main(resp, 401, { zod: error, extras: error })
			}
			return HandleResponse.main(resp, 400, { erro: error })
		}
	},

	async editar(req: ITagEditar, resp: Response) {
		const id = parseInt(req.params.id)
		try {
			zodTag.tag.parse(req.body)
			const { existe, erro } = await serviceTags.verificarSeTagExiste(parseInt(req.params.id))
			if (erro) {
				return HandleResponse.main(resp, 400, { erro: erro, extras: erro})
			}
			if (!existe) {
				return HandleResponse.main(resp, 400, { erro: 'Tag não existe' },)
			} else {
				const { resultado } = await serviceTags.editar({ id, nome: req.body.nome })
				return HandleResponse.main(resp, 200, { data: resultado })
			}
		} catch (error) {
			if (error instanceof ZodError) {
				return HandleResponse.main(resp, 400, { zod: error, extras: error })
			}
			return HandleResponse.main(resp, 400, { erro: error })
		}
	},

	async buscarPorID(req: ParametroID.RequestParametroID, resp: Response) {
		try {
			const { resultado } = await serviceTags.buscarPorId(parseInt(req.params.id))
			if (!resultado) {
				return HandleResponse.main(resp, 404, { erro: 'Tag não encontrada' },)
			}
			return HandleResponse.main(resp, 200, { data: resultado })
		} catch (error) {
			return HandleResponse.main(resp, 400, { erro: error })
		}
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
				throw ErrorGenerico.main(`Tag ${tag} não encontrada`)
			}
		})
		if (existe.length < 1) {
			throw ErrorGenerico.main('Nenhuma tag informada foi encontrada')
		}
		return existe
	}
}
