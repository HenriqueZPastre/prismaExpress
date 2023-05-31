import { Paginator, TodosOsParametrosDoPaginator } from '../utils/Paginator/Paginator'
import { ITags, TCriarTag, TEditarTag, TListarTags } from './ITags'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
class ServiceTags implements ITags {
	async listarTodas(params: TodosOsParametrosDoPaginator): Promise<{ consulta: TListarTags[] | null, error: unknown }> {
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
			return { consulta, error: null }
		} catch (error) {
			return { consulta: null, error: null }
		}
	}

	async deletar(id: number): Promise<void> {
		await prisma.tags.update({
			data: {
				deletede_at: new Date()
			},
			where: {
				id: id,
			}
		})
	}
	criar(obj: TCriarTag): Promise<TListarTags> {
		throw new Error('Method not implemented.')
	}
	editar(obj: TEditarTag): Promise<TListarTags> {
		throw new Error('Method not implemented.')
	}
	buscarPorId(id: number): Promise<TListarTags> {
		throw new Error('Method not implemented.')
	}
	verificarSeTagExiste(id: number): Promise<boolean> {
		throw new Error('Method not implemented.')
	}


}

export const serviceTags = new ServiceTags()