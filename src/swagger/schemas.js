"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refSchema = exports.schema = void 0;
const contas_swagger_1 = require("../models/contas/contas.swagger");
const tags_swagger_1 = require("../models/tags/tags.swagger");
const lancamentos_swagger_1 = require("../models/lancamentos/lancamentos.swagger");
exports.schema = {
    createContas: contas_swagger_1.ModelsSwaggerContas.create,
    responseCreateConta: contas_swagger_1.ModelsSwaggerContas.responseCreateConta,
    listarContas: contas_swagger_1.ModelsSwaggerContas.responseListarContas,
    getConta: contas_swagger_1.ModelsSwaggerContas.responseGetConta,
    editarContas: contas_swagger_1.ModelsSwaggerContas.editar,
    createTags: tags_swagger_1.ModelsSwaggerTag.create,
    responseCreateTag: tags_swagger_1.ModelsSwaggerTag.responseCreateTag,
    listarTags: tags_swagger_1.ModelsSwaggerTag.responseListarTags,
    getTag: tags_swagger_1.ModelsSwaggerTag.responseGetTag,
    editarTags: tags_swagger_1.ModelsSwaggerTag.editar,
    createLancamentos: lancamentos_swagger_1.ModelsSwaggerLancamentos.create,
    responseCreateLancamentos: lancamentos_swagger_1.ModelsSwaggerLancamentos.responseCreate,
    editarLancamentos: lancamentos_swagger_1.ModelsSwaggerLancamentos.editar,
    listarLancamentos: lancamentos_swagger_1.ModelsSwaggerLancamentos.listarLancamentos,
};
const refSchema = (schema) => {
    return `#/components/schemas/${schema}`;
};
exports.refSchema = refSchema;
