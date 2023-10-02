"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsSwaggerLancamentos = void 0;
const zod_openapi_1 = require("@anatine/zod-openapi");
const lancamentos_1 = require("./lancamentos");
const zod_1 = require("zod");
exports.ModelsSwaggerLancamentos = {
    create: (0, zod_openapi_1.generateSchema)(lancamentos_1.zodLancamentos.create),
    responseCreate: (0, zod_openapi_1.generateSchema)(lancamentos_1.zodLancamentos.responseCreate),
    editar: (0, zod_openapi_1.generateSchema)(lancamentos_1.zodLancamentos.editar),
    listarLancamentos: (0, zod_openapi_1.generateSchema)(zod_1.z.array(lancamentos_1.zodLancamentos.responseCreate))
};
