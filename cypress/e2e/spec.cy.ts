/// <reference types="cypress" />
const url = '/tags'

describe('Testes de GET na rota /tags', () => {
	it('Sucesso', () => {
		cy.api({
			method: 'GET',
			url: url + '?coluna=nomes',
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).be.equal(400)
			expect(response.body.erro).eq('Erro ao listar tags')
		})
	})

	it('All true', () => {
		cy.api({
			method: 'GET',
			url: url + '?all=true',
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).be.equal(200)
			expect(response.body.data).be.an('array')
			expect(response.body.data.length).greaterThan(15)
		})
	})

	it('Take falha se all=true', () => {
		const take = 2
		cy.api({
			method: 'GET',
			url: url + '?all=true&take=' + take,
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).be.equal(200)
			expect(response.body.data).be.an('array')
			expect(response.body.data.length).not.eq(take)
		})
	})

	it('Take sucess', () => {
		const take = 2
		cy.api({
			method: 'GET',
			url: url + '?take=' + take,
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).be.equal(200)
			expect(response.body.data).be.an('array')
			expect(response.body.data.length).eq(take)
		})
	})

	it('stars', () => {
		cy.api({
			method: 'POST',
			url: url,
			failOnStatusCode: false,
			body: { 'nome': 'teste' }
		}).then((response) => {
			console.log(JSON.stringify(response.body))
			expect(response.status).be.equal(200)
		})
	})
})


