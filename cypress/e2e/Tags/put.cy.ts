/// <reference types= 'cypress'/>

import { ROTAS } from '../rotas'
let idTAG: { id: number, nome: string }

const alterarNome = (obj: { id: number, nome: string }) => {
	if (obj.nome === 'TESTE DE EDICAO') {
		return 'Editou mesmo'
	} else {
		return 'TESTE DE EDICAO'
	}
}

describe('Testes de PUT na rota /tags', () => {
	it('Busca um ID que existe para usar nos testes', () => {
		cy.api({
			method: 'GET',
			url: ROTAS.tags,
			failOnStatusCode: false,
		}).then((resp) => {
			idTAG = resp.body.data[0]
		})
	})
	it('Edita com sucesso', () => {
		cy.api({
			method: 'PUT',
			url: ROTAS.tags + '/' + idTAG.id,
			failOnStatusCode: false,
			body: { 'nome': alterarNome(idTAG) }
		}).then((response) => {
			expect(response.status).be.equal(200)
			expect(response.body.data).be.an('object').contains({ 'nome': alterarNome(idTAG) })
			expect(response.body.data.id).be.an('number')
		})
	})
})