
export interface IRetornoPaginator {
	take: number | undefined;
	skip: number | undefined;
}

// Interface para consulta de paginação
export interface IParametrosDoPaginator {
	take?: string | undefined;
	page?: string | undefined;
	all?: string | undefined;
}

export class Paginacao {
	static main(query: IParametrosDoPaginator): IRetornoPaginator {
		const all = query.all === 'true' ? Boolean(query.all) : null
		const take = !all ? Number(query.take) || 15 : undefined
		const skip = (take && Number(query.page) > 1) ? (Number(query.page) - 1) * take : undefined
		return { take, skip }
	}
}

