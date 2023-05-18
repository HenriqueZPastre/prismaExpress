import { Request } from 'express'
import { IParametrosDeOrdenacao, IRetornosParaOrdenacao, OrdenarConsultas } from './OrdenarConsulta'
import { IParametrosDoPaginator, IRetornoPaginator, Paginacao } from './Paginacao'

export interface TodosOsParametrosDoPaginator extends IParametrosDoPaginator, IParametrosDeOrdenacao { }
export interface TodosOsRetornosDoPaginator extends IRetornoPaginator, IRetornosParaOrdenacao { }

export interface IRequestPaginator extends Request {
	query: {
		[key: string]: string | string[] | undefined;
	} & TodosOsParametrosDoPaginator;
}

export class Paginator {
	static main(query: TodosOsParametrosDoPaginator): TodosOsRetornosDoPaginator {
		console.log(query)
		const paginator = Paginacao.main(query)
		const order = OrdenarConsultas.main(query)
		console.log({ ...paginator, ...order })
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
