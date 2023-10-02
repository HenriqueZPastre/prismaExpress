"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodTag = void 0;
const zod_1 = require("zod");
exports.zodTag = {
    prisma: zod_1.z.object({
        id: zod_1.z.number().int(),
        create_at: zod_1.z.date(),
        delete_at: zod_1.z.date().nullable(),
        nome: zod_1.z.string().min(2).max(60).trim(),
    }),
    tag: zod_1.z.object({
        nome: zod_1.z.string().min(2).max(60).trim(),
    }),
    listar: zod_1.z.object({
        id: zod_1.z.number().int(),
        nome: zod_1.z.string().min(2).max(60).trim(),
    })
};
