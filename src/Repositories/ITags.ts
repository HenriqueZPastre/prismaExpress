import { tag } from 'src/models/tags'
import { TodosOsParametrosDoPaginator } from 'src/utils/Paginator/Paginator'
import { ModelTAG as M } from 'src/models/tags'

export type TListarTags = Zod.infer<typeof M.zodTag.listar>
export type TCriarTag = Zod.infer<typeof M.zodTag.tag>
export type TEditarTag = TListarTags

export interface ITags {
	listarTodas(params: TodosOsParametrosDoPaginator): Promise<{ consulta: TListarTags[] | null, error: unknown }>
	deletar(id: number): void
	criar(obj: tag): Promise<TListarTags>
	editar(obj: TEditarTag): Promise<TListarTags>
	buscarPorId(id: number): Promise<TListarTags>
	verificarSeTagExiste(id: number): Promise<boolean>
}