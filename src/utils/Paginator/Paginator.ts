import { Request } from 'express'
import { IParametrosDeOrdenacao, IRetornosParaOrdenacao, OrdenarConsultas } from './OrdenarConsulta'
import { IParametrosDoPaginator, IRetornoPaginator, Paginacao } from './Paginacao'

/**
 * @param take Quantidade de registros por página
 * @param page Número da página
 * @param all Se for true, retorna todos os registros
 * @param coluna Nome da coluna para ordenar
 * @param order Tipo de ordenação
 */
export interface TodosOsParametrosDoPaginator extends IParametrosDoPaginator, IParametrosDeOrdenacao { }
export interface TodosOsRetornosDoPaginator extends IRetornoPaginator, IRetornosParaOrdenacao { }

export interface IRequestPaginator extends Request {
	query: {
		[key: string]: string | string[] | undefined;
	} & TodosOsParametrosDoPaginator;
}

export class Paginator {
	static main(query: TodosOsParametrosDoPaginator): TodosOsRetornosDoPaginator {
		const paginator = Paginacao.main(query)
		const order = OrdenarConsultas.main(query)
		return { ...paginator, ...order }
	}

	static paginas(query: IParametrosDoPaginator): IRetornoPaginator {
		const paginator = Paginacao.main(query)
		return paginator
	}

	static ordenacao(query: IParametrosDeOrdenacao): IRetornosParaOrdenacao {
		const order = OrdenarConsultas.main(query)
		return order
	}
}
