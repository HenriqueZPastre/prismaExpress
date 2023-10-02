"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerPaths = void 0;
const contas_1 = require("./paths/contas");
const lancamentos_1 = require("./paths/lancamentos");
const tags_1 = require("./paths/tags");
exports.swaggerPaths = {
    '/contas': contas_1.contas['/contas'],
    '/contas/{id}': contas_1.contas['/contas/{id}'],
    '/tags': tags_1.tags['/tags'],
    '/tags/{id}': tags_1.tags['/tags/{id}'],
    '/lancamentos': lancamentos_1.Lancamentos['/lancamentos'],
    '/lancamentos/{id}': lancamentos_1.Lancamentos['/lancamentos/{id}'],
};
