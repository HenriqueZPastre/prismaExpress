"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodContas = void 0;
const zod_1 = require("zod");
exports.zodContas = {
    prisma: zod_1.z.object({
        id: zod_1.z.number().int(),
        create_at: zod_1.z.date(),
        delete_at: zod_1.z.date().nullable(),
        update_at: zod_1.z.date().nullable(),
        codigoBanco: zod_1.z.number().int(),
        nome: zod_1.z.string().min(2).max(60).trim(),
        saldoInicial: zod_1.z.number().min(1),
        saldoAtual: zod_1.z.number().min(1),
    }),
    create: zod_1.z.object({
        id: zod_1.z.number().int().optional(),
        create_at: zod_1.z.date().optional(),
        codigoBanco: zod_1.z.number(),
        nome: zod_1.z.string().min(2).max(60).trim(),
        saldoInicial: zod_1.z.number().min(1).optional(),
        saldoAtual: zod_1.z.number().min(1).optional(),
    }),
    responseContas: zod_1.z.object({
        id: zod_1.z.number().int(),
        nome: zod_1.z.string()
    }),
    listar: zod_1.z.object({
        id: zod_1.z.number().int(),
        nome: zod_1.z.string().trim(),
        saldoInicial: zod_1.z.number(),
        saldoAtual: zod_1.z.number(),
    }),
    editar: zod_1.z.object({
        nome: zod_1.z.string().trim().optional(),
        saldoInicial: zod_1.z.number().min(1).optional(),
    })
};
