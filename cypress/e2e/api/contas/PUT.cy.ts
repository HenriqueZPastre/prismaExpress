/// <reference types='cypress' />

describe('Testes de metodo PUT em contas', () => {
	let id = 0
	it('PUT conta não existe', () => {
		cy.request({
			method: 'PUT',
			url: '/contas/9999',
			body: {
				nome: 'TESZTE',
				saldoInicial: 5412584156
			},
			failOnStatusCode: false
			
		}).then(resp => {
			expect(resp.body.data.error).be.equal('Não foi possível editar a conta')
		})
	})

	it('Realizar a request da listagem de contas', () => {
		cy.request('GET', '/contas').then(resp => {
			id = resp.body.data[0].id
		})
	})

	it('PUT editada com sucesso', () => {
		cy.request({
			method: 'PUT',
			url: `/contas/${id}`,
			body: {
				nome: 'TESZTE',
				saldoInicial: 5412584156
			},
			failOnStatusCode: false
			
		}).then(resp => {
			expect(resp.status).be.equal(200)
		})
	})

	it('PUT body vazio', () => {
		cy.request({
			method: 'PUT',
			url: `/contas/${id}`,
			failOnStatusCode: false
			
		}).then(resp => {
			expect(resp.status).be.equal(400)
			expect(resp.body.data.error).be.equal('O corpo da requisição deve incluir pelo menos uma propriedade para alteração')
		})
	})

	it('PUT body com nomes errados', () => {
		cy.request({
			method: 'PUT',
			url: `/contas/${id}`,
			body:{
				nomes: 'ERRo',
				saldosIniciais: 4845
			},
			failOnStatusCode: false
			
		}).then(resp => {
			expect(resp.status).be.equal(400)
			expect(resp.body.data.error).be.equal('O corpo da requisição deve incluir pelo menos uma propriedade para alteração')
		})
	})

	it('PUT editada com sucesso', () => {
		cy.request({
			method: 'PUT',
			url: `/contas/${id}`,
			body: {
				nome: 55,
				saldoInicial: '999'
			},
			failOnStatusCode: false
			
		}).then(resp => {
			expect(resp.status).be.equal(200)
		})
	})
})
