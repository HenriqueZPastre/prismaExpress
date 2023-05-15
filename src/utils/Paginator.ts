import { Request } from 'express'

export type ParametrosDeConsultaDoPaginator = {
	take?: string | undefined
	pagina?: string | undefined
	all?: string | undefined,
	order?: 'desc' | 'asc' | undefined,
	colunaDeordenacao?: string | undefined
}
export interface InterfaceRequestPaginator extends Request {
	query: ParametrosDeConsultaDoPaginator
}

const ordenar = (obj: ParametrosDeConsultaDoPaginator) => {
	const parametroDeOrdenacao = obj.colunaDeordenacao
	let colunaDeordenacao = undefined
	const order = obj.order
	if (parametroDeOrdenacao) {
		colunaDeordenacao = {
			[parametroDeOrdenacao]: order || 'desc'
		}
	}
	return { colunaDeordenacao, order }
}

const paginaEQuantidadeDeRegistros = (obj: ParametrosDeConsultaDoPaginator) => {
	let take: number | undefined = Number(obj.take) || 15
	let pagina = Number(obj.pagina)
	let skip = undefined
	const all = obj.all === 'true' ? Boolean(obj.all) : null
	
	if (!all) {
		pagina > 1 ? skip = (pagina - 1) * take : skip = undefined
		return { take, skip }
	} else {
		take = undefined
		pagina = NaN
		return { take, skip }
	}
}

/**
 * Função main do PAGINATOR.
 * All = Se for true, retorna todos os registros.
 * Take = Quantidade de registros por página (default 15)
 * pagina = Página atual desejada, se for undefined pega a pagina 1
 * @param req 
 * @returns take and skip(pagina)
 */
export function main(request: ParametrosDeConsultaDoPaginator) {

	const { take, skip } = paginaEQuantidadeDeRegistros(request)

	const { colunaDeordenacao, order } = ordenar(request)

	return ({ take, skip, order, colunaDeordenacao })
}

export * as PAGINATOR from './Paginator'


