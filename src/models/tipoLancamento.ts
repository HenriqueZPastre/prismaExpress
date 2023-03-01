export type createTipoLancamento = {
	id?: number
	nome: string
}

/**
 * 0 = Receita
 * 1 = Despesa
 */
export type tiposPadrao = 0 | 1