/// <reference types = 'cypress'/>

let teste: number;
describe('Valida a request de delete', () => {

	it('Realizar a request da listagem de contas', () => {
		cy.request('GET', '/contas').then(resp => {
			teste = resp.body[0].id
		})
	})

	it('DELETE Sucess', () => {
		cy.request('DELETE', `/contas/${teste}`).then(response => {
			expect(response.status).eql(204)
		})
	})

	it('DELET Conta não existe', () => {
		cy.request({
			method: "DELETE",
			url: `/contas/${teste}`,
			failOnStatusCode: false
		}).then(response => {
			expect(response.status).eql(404)
			expect(response.body.message).eql('Conta não encontrada')
		})
	})
})
