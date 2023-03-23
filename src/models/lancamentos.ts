export type createLancamentos = {
	descricao: string
	valor: number
	dataVencimento: Date | undefined
	contasId: number
	dataPagamento?: Date
	/**
	 * 0 é entrada
	 * 
	 * 1 é saida
	 */
	tipo: 0 | 1
	tags?: number[]
}

const a : createLancamentos = {
	descricao: "",
	valor: 0,
	dataVencimento: undefined,
	contasId: 0,
	tipo: 0
}
