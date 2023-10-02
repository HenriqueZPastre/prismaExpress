"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsSwaggerContas = void 0;
const zod_openapi_1 = require("@anatine/zod-openapi");
const contas_1 = require("./contas");
const zod_1 = require("zod");
exports.ModelsSwaggerContas = {
    create: (0, zod_openapi_1.generateSchema)(contas_1.zodContas.create),
    responseCreateConta: (0, zod_openapi_1.generateSchema)(contas_1.zodContas.responseContas),
    responseListarContas: (0, zod_openapi_1.generateSchema)(zod_1.z.array(contas_1.zodContas.listar)),
    editar: (0, zod_openapi_1.generateSchema)(contas_1.zodContas.editar),
    responseGetConta: (0, zod_openapi_1.generateSchema)(contas_1.zodContas.listar),
};
