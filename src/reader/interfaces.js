"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodDadosDoBanco = exports.zodTransacao = void 0;
const zod_1 = require("zod");
exports.zodTransacao = zod_1.z.object({
    especieTransacao: zod_1.z.string().nonempty(),
    date: zod_1.z.string().nonempty(),
    valor: zod_1.z.number(),
    id: zod_1.z.string().nonempty(),
    memo: zod_1.z.string().nonempty(),
    tipoOperacao: zod_1.z.number(),
});
exports.zodDadosDoBanco = zod_1.z.object({
    id: zod_1.z.string().nonempty(),
    nome: zod_1.z.string().nonempty(),
    numeroConta: zod_1.z.string().nonempty(),
    dataInicial: zod_1.z.string().nonempty(),
    dataFinal: zod_1.z.string().nonempty(),
});
