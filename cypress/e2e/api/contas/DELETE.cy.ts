/// <reference types = 'cypress'/>

let teste: number;
describe('Verificar a tipagem e o valor do response para cada resultado da listagem de contas bancarias', () => {
	
	it('Realizar a request', () => {
		cy.request('GET', '/contas').then(resp => {
			teste = resp.body[0].id
		})
	})
	it('DELETE Sucesss', () => {
		cy.request('DELETE', `/contas/${teste}`).then(response => {
			expect(response.status).eql(204)
		})
	})

	it('DELET Fail', () => {
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
