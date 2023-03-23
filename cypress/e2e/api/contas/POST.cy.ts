/// <reference types = 'cypress'/>

import { editarContas } from '../../../../src/models/contas';
import { novaConta } from './objetos';

describe('Verifica a tipagem e o valor do response para cada resultado da listagem de contas bancarias', () => {
	it('Realizar a request com sucesso', () => {
		cy.request({
			method: 'POST',
			url: '/contas',
			body: novaConta
		}).then(response => {
			expect(response.status).eql(201)
		})
	})
	it('Realizar a request com erro', () => {
		cy.request({
			method: 'POST',
			url: '/contas',
			body: {
				nome: '',
				saldoInicial: 200,
				saldoAtual: 100
			},
			failOnStatusCode: false
		}).then(response => {
			const body: editarContas = response.body.data.error
			expect(body).eql('Nome é obrigatório')
		})
	})
})