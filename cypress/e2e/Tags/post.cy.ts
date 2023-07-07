/// <reference types="cypress" />

import { ROTAS } from '../rotas'


describe('Testes de GET na rota /tags', () => {

	it('Valida tipagem do body', () => {
		cy.api({
			method: 'POST',
			url: ROTAS.tags,
			failOnStatusCode: false,
			body: { 'nome': 5585 }
		}).then((response) => {
			expect(response.status).be.equal(401)
			expect(response.body.zod).eq('nome expected string, received number')
		})
	})

	it('Adiciona com sucesso', () => {
		cy.api({
			method: 'POST',
			url: ROTAS.tags,
			failOnStatusCode: false,
			body: { 'nome': 'teste' }
		}).then((response) => {
			console.log(JSON.stringify(response.body))
			expect(response.status).be.equal(200)
			expect(response.body.data).be.an('object').contains({ 'nome': 'teste' })
			expect(response.body.data.id).be.an('number')
		})
	})
})