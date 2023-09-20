import { z } from 'zod'

export interface Tansacoes {
	especieTransacao?: string | null
	date?: string | null
	valor?: number | null
	id?: string | null
	memo?: string | null
	tipoOperacao?: number | null
}

export const zodTransacao = z.object({
	especieTransacao: z.string().nonempty(),
	date: z.string().nonempty(),
	valor: z.number(),
	id: z.string().nonempty(),
	memo: z.string().nonempty(),
	tipoOperacao: z.number(),
})

export const zodDadosDoBanco = z.object({
	id: z.string().nonempty(),
	nome: z.string().nonempty(),
	numeroConta: z.string().nonempty(),
	dataInicial: z.string().nonempty(),
	dataFinal: z.string().nonempty(),
})

export type typeDadosDoBanco = z.infer<typeof zodDadosDoBanco>
export type typeTransacao = z.infer<typeof zodTransacao>

export type responseBanco = {
	codigoBanco: number
	id: number
}

export interface DadosDoBanco {
	id?: string
	nome?: string
	numeroConta?: string
	dataInicial?: string
	dataFinal?: string
}