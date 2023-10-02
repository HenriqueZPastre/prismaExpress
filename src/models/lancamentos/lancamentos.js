"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodLancamentos = void 0;
const zod_1 = require("zod");
const zod_openapi_1 = require("@anatine/zod-openapi");
exports.zodLancamentos = {
    prisma: zod_1.z.object({
        id: zod_1.z.number().int(),
        descricao: zod_1.z.string(),
        valor: zod_1.z.number(),
        dataVencimento: zod_1.z.date(),
        dataPagamento: zod_1.z.date().nullable(),
        tipo: zod_1.z.number().int().describe('0 = entrada <br> 1 = saida'),
        situacao: zod_1.z.number().int(),
        contasId: zod_1.z.number().int(),
    }),
    create: zod_1.z.object({
        descricao: zod_1.z.string().trim().min(2).max(60),
        valor: zod_1.z.number().min(1),
        dataVencimento: (0, zod_openapi_1.extendApi)(zod_1.z.union([zod_1.z.date(), zod_1.z.string()]), {
            description: 'Formato da data: dataUTC'
        }),
        contasId: zod_1.z.number().int(),
        dataPagamento: (zod_1.z.date() || zod_1.z.string()).optional(),
        //0 é entrada, 1 é saida
        tipo: (0, zod_openapi_1.extendApi)(zod_1.z.union([zod_1.z.literal(0), zod_1.z.literal(1)]), {
            description: `0 = entrada <br>
						1 = saida`
        }),
        situacao: (0, zod_openapi_1.extendApi)(zod_1.z.union([zod_1.z.literal(0), zod_1.z.literal(1)]).optional(), {
            description: `0 = ABERTO <br>
						1 = FECHADO`
        }),
        tagsId: zod_1.z.array(zod_1.z.number()).optional()
    }),
    editar: zod_1.z.object({
        descricao: zod_1.z.string().min(2).max(60).trim().optional(),
        valor: zod_1.z.number().min(1).optional(),
        dataVencimento: zod_1.z.union([zod_1.z.date(), zod_1.z.string()]).optional(),
        contasId: zod_1.z.number().int().optional(),
        dataPagamento: (zod_1.z.string() || zod_1.z.date()).optional(),
        tipo: (0, zod_openapi_1.extendApi)(zod_1.z.union([zod_1.z.literal(0), zod_1.z.literal(1)]).optional(), {
            description: `0 = entrada <br>
						1 = saida`
        }),
        situacao: (0, zod_openapi_1.extendApi)(zod_1.z.union([zod_1.z.literal(0), zod_1.z.literal(1)]).optional(), {
            description: `0 = ABERTO <br>
						1 = FECHADO`
        }),
        tags: zod_1.z.array(zod_1.z.number()).optional()
    }),
    responseCreate: zod_1.z.object({
        id: zod_1.z.number().int(),
        descricao: zod_1.z.string(),
        valor: zod_1.z.number(),
        dataVencimento: zod_1.z.date() || zod_1.z.string(),
        dataPagamento: (0, zod_openapi_1.extendApi)((zod_1.z.date() || zod_1.z.string()).optional(), {
            description: 'Se não exister dados, o valor será null'
        }),
        tipo: (0, zod_openapi_1.extendApi)(zod_1.z.union([zod_1.z.literal(0), zod_1.z.literal(1)]), {
            description: `0 = entrada <br>
						1 = saida`
        }),
        situacao: (0, zod_openapi_1.extendApi)(zod_1.z.union([zod_1.z.literal(0), zod_1.z.literal(1)]).optional(), {
            description: `0 = ABERTO <br>
						1 = FECHADO`
        }),
        lancamentos_tags: zod_1.z.array(zod_1.z.object({
            tags: zod_1.z.object({
                nome: zod_1.z.string(),
                id: zod_1.z.number().int()
            })
        }))
    })
};
