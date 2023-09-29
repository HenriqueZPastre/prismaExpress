/**
 *@enum OrdenarConsulta  desc | asc | undefined | string
 */
type OrdenarConsulta = 'desc' | 'asc' | undefined | string
/**
 * @param coluna Nome da coluna para ordenar
 * @param order Tipo de ordenação
 */
export interface IParametrosDeOrdenacao {
	coluna?: string,
	order?: OrdenarConsulta
}

interface IRetornoDeColunaParaOrdenacao {
	[nomeDaColuna: string]: OrdenarConsulta
}

export interface IRetornosParaOrdenacao {
	colunaParaOrdenacao: IRetornoDeColunaParaOrdenacao | undefined,
	order: OrdenarConsulta
}

export class OrdenarConsultas {
	static main = (obj: IParametrosDeOrdenacao): IRetornosParaOrdenacao => {
		const { coluna, order } = obj
		let orderBy: IRetornoDeColunaParaOrdenacao | undefined = undefined

		coluna ? orderBy = {
			[coluna]: order || 'desc'
		} : undefined
		return { colunaParaOrdenacao: orderBy, order }
	}
}