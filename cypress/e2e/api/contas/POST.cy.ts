/// <reference types = 'cypress'/>

import { createContas } from 'src/models/contas';
import { novaConta } from './objetos.cy';

describe('Verificar a tipagem e o valor do response para cada resultado da listagem de contas bancarias', () => {
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
			}
		}).then(response => {
			console.log(response)
			expect(response.body).eql('Nome não pode ser uma string vazia')
		})
	})
})