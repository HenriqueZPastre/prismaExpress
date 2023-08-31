import { Request } from 'express'
import { z } from 'zod'


export const zodBancos = {
	create: z.object({
		codigo: z.string().trim(),
		nome: z.string().trim(),
	}),
	listarBancos: z.object({
		id: z.number().int(),
		nome: z.string(),
	}),
}

export type createBancos = z.infer<typeof zodBancos.create>
export type listarBancos = z.infer<typeof zodBancos.listarBancos>

export interface CreateBancos extends Request {
	body: {
		bancos: createBancos[]
	}
}

export interface ProcurarBancos extends Request {
	query: {
		search: string
	}
}

export const ModelsSwaggerBancos = {
	create: zodBancos.create,
	responseListarBancos: zodBancos.listarBancos,
}