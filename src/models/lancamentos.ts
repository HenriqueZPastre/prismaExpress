export type createLancamentos = {
	nome: string
	dataVencimento: Date
	dataPagamento?: Date
	descricaoBasica: string
	descricaoAdicional?: string
	valor: number
	situacaoId: number
	envolvidosId: number
	contasId: number
	categoriasId: number
	subcategoriasId?: number
}