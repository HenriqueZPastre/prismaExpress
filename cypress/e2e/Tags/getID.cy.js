"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types='cypress'/>
const rotas_1 = require("../rotas");
describe('Testes de GET na rota /tags com parametro ID', () => {
    it('Busca os dados de UM ID', () => {
        cy.request({
            method: 'GET',
            url: rotas_1.ROTAS.tags,
            failOnStatusCode: false,
        }).then((resp) => {
            cy.api({
                method: 'GET',
                url: rotas_1.ROTAS.tags + '/' + resp.body.data[0].id,
            }).then((response) => {
                expect(response.status).be.equal(200);
                expect(response.body.data).be.an('object');
                expect(response.body.data.id).be.eq(resp.body.data[0].id);
                expect(response.body.data.nome).be.eq(resp.body.data[0].nome);
            });
        });
    });
    it('Valida se tag não existe', () => {
        cy.api({
            method: 'GET',
            url: rotas_1.ROTAS.tags + '/5656',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).be.equal(404);
            expect(response.body.erro).eq('Tag não encontrada');
        });
    });
});
