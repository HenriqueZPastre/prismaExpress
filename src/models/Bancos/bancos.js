"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodBancos = void 0;
const zod_1 = require("zod");
exports.zodBancos = {
    prisma: zod_1.z.object({
        id: zod_1.z.number().int(),
        create_at: zod_1.z.date(),
        delete_at: zod_1.z.date().nullable(),
        update_at: zod_1.z.date().nullable(),
        nome: zod_1.z.string(),
    }),
    create: zod_1.z.object({
        id: zod_1.z.string().trim(),
        nome: zod_1.z.string().trim(),
    }),
    listarBancos: zod_1.z.object({
        id: zod_1.z.number().int(),
        nome: zod_1.z.string(),
    }),
};
