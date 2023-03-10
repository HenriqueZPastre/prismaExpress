export type createContas = {
	id?: number
	create_at?: Date
	nome: string
	saldoInicial: number
	saldoAtual: number
} 

export type listarContas = {
	id: number
	nome: string
	saldoInicial: number
	saldoAtual: number
}
