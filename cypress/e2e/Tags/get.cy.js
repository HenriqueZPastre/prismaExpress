"use strict";
/// <reference types="cypress" />
Object.defineProperty(exports, "__esModule", { value: true });
const rotas_1 = require("../rotas");
describe('Testes de GET na rota /tags', () => {
    it('Nome da coluna não existe', () => {
        cy.api({
            method: 'GET',
            url: rotas_1.ROTAS.tags + '?coluna=nomes',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).be.equal(400);
            expect(response.body.erro).eq('Erro ao listar tags');
        });
    });
    it('All true', () => {
        cy.api({
            method: 'GET',
            url: rotas_1.ROTAS.tags + '?all=true',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).be.equal(200);
            expect(response.body.data).be.an('array');
            expect(response.body.data.length).greaterThan(15);
        });
    });
    it('Take é ignorado se all=true', () => {
        const take = 2;
        cy.api({
            method: 'GET',
            url: rotas_1.ROTAS.tags + '?all=true&take=' + take,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).be.equal(200);
            expect(response.body.data).be.an('array');
            expect(response.body.data.length).not.eq(take);
        });
    });
    it('Take sucess', () => {
        const take = 2;
        cy.api({
            method: 'GET',
            url: rotas_1.ROTAS.tags + '?take=' + take,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).be.equal(200);
            expect(response.body.data).be.an('array');
            expect(response.body.data.length).eq(take);
        });
    });
});
