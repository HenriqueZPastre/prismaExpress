import { Paginator, TodosOsParametrosDoPaginator } from '../../utils/Paginator/Paginator'
import { ITags, TCriarTag, TEditarTag, TListarTags } from './ITags'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
class ServiceTags implements ITags {
	async listarTodas(params: TodosOsParametrosDoPaginator): Promise<{ consulta: TListarTags[] | null, erro: unknown }> {
		try {
			const { take, skip, colunaParaOrdenacao, order } = Paginator.main(params)
			const consulta: TListarTags[] = await prisma.tags.findMany({
				select: {
					id: true,
					nome: true,
				},
				where: {
					deletede_at: null
				},
				take: take,
				skip: skip,
				orderBy: colunaParaOrdenacao ? colunaParaOrdenacao : {
					id: order || 'desc'
				}
			})
			return { consulta, erro: null }
		} catch (error) {
			return { consulta: null, erro: error }
		}
	}

	async deletar(id: number): Promise<{ error: unknown }> {
		try {
			await prisma.tags.update({
				data: {
					deletede_at: new Date()
				},
				where: {
					id: id,
				}
			})
			return { error: undefined }
		} catch (error) {
			return { error: error }
		}
	}
	async criar(params: TCriarTag): Promise<{ resultado: TListarTags | null, erro: unknown }> {
		try {
			const tag = await prisma.tags.create({
				select: {
					nome: true,
					id: true,
				},
				data: {
					nome: params.nome
				}
			})
			return { resultado: tag, erro: null }
		} catch (error) {
			return { resultado: null, erro: error }
		}
	}
	async editar(params: TEditarTag): Promise<{ resultado: TListarTags | null, erro: unknown }> {
		try {
			const update = await prisma.tags.update({
				select: {
					id: true,
					nome: true
				},
				data: {
					nome: params.nome
				},
				where: {
					id: params.id
				}
			})
			return { resultado: update, erro: null }
		} catch (error) {
			return { resultado: null, erro: error }
		}
	}
	async buscarPorId(id: number): Promise<{ resultado: TListarTags | null, erro: unknown }> {
		try {
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
			return { resultado: tag, erro: null }
		} catch (error) {
			return { resultado: null, erro: error }
		}
	}

	async verificarSeTagExiste(id: number): Promise<{ existe: boolean | null, erro: unknown }> {
		try {
			const numeroDeLancamentos = await prisma.tags.count({
				where: {
					id: id,
					deletede_at: null
				}
			})
			return { existe: numeroDeLancamentos > 0 ? true : false, erro: null }
		} catch (error) {
			console.error('aaa',error)
			return { existe: null, erro: new Error(String(error)) }
		}
	}

	async verificarAsociacoesDeTag(id: number): Promise<{ qnt: number | null, erro: unknown }> {
		try {
			await prisma.tags.findFirstOrThrow({
				where: {
					id: id,
					deletede_at: null
				}
			})
			const numeroDeLancamentos = await prisma.lancamentos_tags.count({
				where: {
					tagsId: id,
					deletede_at: null,
					tags: {
						deletede_at: null
					}
				}
			})
			return { qnt: numeroDeLancamentos, erro: null }
		} catch (error) {
			return { qnt: null, erro: error }
		}
	}

}

export const serviceTags = new ServiceTags()