/// <reference types = 'cypress'/>

let teste: number;
let newContaId: number;

describe('Valida a request de delete', () => {

	it('Realizar a request da listagem de contas', () => {
		cy.request('GET', '/contas').then(resp => {
			teste = resp.body.data[0].id
		})
	})

	it('Não é possivel excluir pois possui vinculo com outros dados do banco', () => {
		cy.request({
			method: 'DELETE',
			url: `/contas/${teste}`,
			failOnStatusCode: false
		}).then(response => {
			expect(response.status).eql(400)
			expect(response.body.data.message).be.eql('Conta não pode ser excluida pois possui vinculo com outros dados do banco')
		})
	})

	it('Conta não existe', () => {
		cy.request({
			method: "DELETE",
			url: `/contas/89725`,
			failOnStatusCode: false
		}).then(response => {
			expect(response.status).eql(404)
			expect(response.body.data.error).eql('Conta não encontrada')
		})
	})

	it('Cria uma conta para poder deletar em seguida', () => {
		cy.request({
			method: 'POST',
			url: '/contas',
			body: {
				nome: 'TESTES'
			}
		}).then(resp => {
			newContaId = resp.body.data
			Number(newContaId)
		})
	})

	it('Conta deletada com sucesso', () => {
		cy.request({
			method: "DELETE",
			url: `/contas/${newContaId}`,
			failOnStatusCode: false
		}).then(response => {
			expect(response.status).eql(204)
		})
	})
})
