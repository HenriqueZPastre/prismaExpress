/// <reference types="cypress" />
const url = '/tags?coluna=nomes'

describe('Testes de GET na rota /tags', () => {
	it('Sucesso', () => {
		cy.api({
			method: 'GET',
			url: url,
			failOnStatusCode: false,
			body:{}
		}).then((response) => {
			expect(response.status).be.equal(200)
			expect(response.body.data).be.an('array')
			expect(response.body.data.length).greaterThan(15)
		})
	})

	/* 
		it('All true', async () => {
			await r.get('?all=true').then((response) => {
				expect(response.status).be.equal(200)
				expect(response.body.data).be.an('array')
				expect(response.body.data.length).toBeGreaterThan(15)
			})
		})
	
		it('Take falha se all=true', async () => {
			const take = 2
			await r.get('?all=true&take=' + take).then((response) => {
				expect(response.status).be.equal(200)
				expect(response.body.data).be.an('array')
				expect(response.body.data.length).not.eq(take)
			})
		})
	
		it('Take sucess', async () => {
			const take = 2
			await r.get('?take=' + take).then((response) => {
				expect(response.status).be.equal(200)
				expect(response.body.data).be.an('array')
				expect(response.body.data.length).eq(take)
			})
		})
	
		it('stars', async () => {
			await r
				.post('')
				.send({ 'nome': 555 })
				.then((response) => {
					console.log(JSON.stringify(response.body))
					expect(response.status).be.equal(401)
				})
		}) */
})


