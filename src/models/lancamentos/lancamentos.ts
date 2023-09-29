import { z } from 'zod'
import { extendApi } from '@anatine/zod-openapi'

export const zodLancamentos = {

	prisma: z.object({
		id: z.number().int(),
		descricao: z.string(),
		valor: z.number(),
		dataVencimento: z.date(),
		dataPagamento: z.date().nullable(),
		tipo: z.number().int().describe('0 = entrada <br> 1 = saida'),
		situacao: z.number().int(),
		contasId: z.number().int(),
	}),

	create: z.object({
		descricao: z.string().trim().min(2).max(60),
		valor: z.number().min(1),
		dataVencimento: extendApi(z.union([z.date(), z.string()]), {
			description: 'Formato da data: dataUTC'
		}),
		contasId: z.number().int(),
		dataPagamento: (z.date() || z.string()).optional(),
		//0 é entrada, 1 é saida
		tipo: extendApi(z.union([z.literal(0), z.literal(1)]), {
			description: `0 = entrada <br>
						1 = saida`
		}),
		situacao: extendApi(z.union([z.literal(0), z.literal(1)]).optional(), {
			description: `0 = ABERTO <br>
						1 = FECHADO`
		}),
		tagsId: z.array(z.number()).optional()
	}),

	editar: z.object({
		descricao: z.string().min(2).max(60).trim().optional(),
		valor: z.number().min(1).optional(),
		dataVencimento: z.union([z.date(), z.string()]).optional(),
		contasId: z.number().int().optional(),
		dataPagamento: (z.string() || z.date()).optional(),
		tipo: extendApi(z.union([z.literal(0), z.literal(1)]).optional(), {
			description: `0 = entrada <br>
						1 = saida`
		}),
		situacao: extendApi(z.union([z.literal(0), z.literal(1)]).optional(), {
			description: `0 = ABERTO <br>
						1 = FECHADO`
		}),
		tags: z.array(z.number()).optional()

	}),

	responseCreate: z.object({
		id: z.number().int(),
		descricao: z.string(),
		valor: z.number(),
		dataVencimento: z.date() || z.string(),
		dataPagamento: extendApi((z.date() || z.string()).optional(), {
			description: 'Se não exister dados, o valor será null'
		}),
		tipo: extendApi(z.union([z.literal(0), z.literal(1)]), {
			description: `0 = entrada <br>
						1 = saida`
		}),
		situacao: extendApi(z.union([z.literal(0), z.literal(1)]).optional(), {
			description: `0 = ABERTO <br>
						1 = FECHADO`
		}),
		lancamentos_tags: z.array(z.object({
			tags: z.object({
				nome: z.string(),
				id: z.number().int()
			})
		}))
	})
}