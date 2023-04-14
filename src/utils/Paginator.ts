import { Request } from 'express'

export type QueryPaginator = {
	take?: string | undefined
	pagina?: string | undefined
	all?: string | undefined
}

export interface Paginator extends Request {
	query: QueryPaginator
}

/**
 * Função main do PAGINATOR.
 * All = Se for true, retorna todos os registros.
 * Take = Quantidade de registros por página (default 15)
 * pagina = Página atual desejada, se for undefined pega a pagina 1
 * @param req 
 * @returns take and skip(pagina)
 */
export function main(req: QueryPaginator) {
	const all = req.all === 'true' ? Boolean(req.all) : null
	let take: number | undefined = Number(req.take) || 15
	let pagina = Number(req.pagina)
	let skip = undefined

	if (all) {
		take = undefined
		pagina = NaN
	}

	if (pagina && take) {
		pagina > 1 ? skip = (pagina - 1) * take : skip = undefined
	}
	return ({ take, skip })
}

export * as PAGINATOR from './Paginator'


