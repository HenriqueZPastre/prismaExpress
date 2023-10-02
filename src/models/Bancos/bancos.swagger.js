"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsSwaggerBancos = void 0;
const zod_openapi_1 = require("@anatine/zod-openapi");
const bancos_1 = require("./bancos");
exports.ModelsSwaggerBancos = {
    create: (0, zod_openapi_1.generateSchema)(bancos_1.zodBancos.create),
    responseListarBancos: (0, zod_openapi_1.generateSchema)(bancos_1.zodBancos.listarBancos),
};
