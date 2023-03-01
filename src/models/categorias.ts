import { tiposPadrao } from './tipoLancamento'

export type createCategorias = {
	id?: number
	create_at?: Date
	nome: string
	/**
 	* 0 = Receita
 	* 1 = Despesa
 	*/
	tiposLancamentosId: tiposPadrao
}