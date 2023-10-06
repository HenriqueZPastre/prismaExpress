import { z } from 'zod'
import { zodTag } from '../../models/tags/tags'
import { Tag } from '../../models/tags/tags.interface'
import { TodosOsParametrosDoPaginator } from '../../utils/Paginator/Paginator'


export type TListarTags = z.infer<typeof zodTag.listar>
export type TCriarTag = z.infer<typeof zodTag.tag>
export type TEditarTag = TListarTags

export interface ITags {
	listarTodas(params: TodosOsParametrosDoPaginator): Promise<{ consulta: TListarTags[] | null, erro: unknown }>
	
	deletar(id: number): Promise<{ error: unknown }>
	criar(params: Tag): Promise<{ resultado: TListarTags | null, erro: unknown }>
	editar(params: TEditarTag): Promise<{ resultado: TListarTags | null, erro: unknown }>
	buscarPorId(id: number): Promise<{ resultado: TListarTags | null, erro: unknown }>
	verificarSeTagExiste(id: number): Promise<{ existe: boolean | null, erro: unknown }>
	verificarAsociacoesDeTag(id: number): Promise<{ qnt: number | null, erro: unknown }>
}