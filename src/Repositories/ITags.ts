import { tag } from 'src/models/tags'
import { TodosOsParametrosDoPaginator } from 'src/utils/Paginator/Paginator'
import { ModelTAG as M } from 'src/models/tags'

export type TListarTags = Zod.infer<typeof M.zodTag.listar>
export type TCriarTag = Zod.infer<typeof M.zodTag.tag>
export type TEditarTag = TListarTags

export interface ITags {
	listarTodas(params: TodosOsParametrosDoPaginator): Promise<{ consulta: TListarTags[] | null, erro: unknown }>
	deletar(id: number): Promise<{ error: unknown }>
	criar(params: tag): Promise<{ resultado: TListarTags | null, erro: unknown }>
	editar(params: TEditarTag): Promise<{ resultado: TListarTags | null, erro: unknown }>
	buscarPorId(id: number): Promise<{ resultado: TListarTags | null, erro: unknown }>
	verificarSeTagExiste(id: number): Promise<{ existe: boolean | null, erro: unknown }>
	verificarAsociacoesDeTag(id: number): Promise<{ qnt: number | null, erro: unknown }>
}