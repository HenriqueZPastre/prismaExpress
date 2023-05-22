/// <reference types = 'cypress'/>

import { listarContas } from '../../../../src/models/contas'

describe('Verificar a tipagem e o valor do response para cada resultado da listagem de contas bancarias', () => {
	it('Realizar a request', () => {
		cy.request('GET', '/contas').then(response => {
			const body: listarContas[] = response.body.data
			body.forEach(conta => {
				expect(typeof conta.id).to.eq('number')
				expect(typeof conta.nome).to.eq('string')
				expect(typeof conta.saldoInicial).to.eq('number')
				expect(typeof conta.saldoAtual).to.eq('number')
				expect(Object.keys(conta).length).to.be.eq(4)
			})
		})
	})
})