import { createContas } from '../../../../src/Models/contas'

export const novaConta: createContas = {
	nome: 'TESTE',
	saldoInicial: 200,
	saldoAtual: 100
}

export const contaFalha = {
	nome: '',
	saldoInicial: 200,
	saldoAtual: 100
}
