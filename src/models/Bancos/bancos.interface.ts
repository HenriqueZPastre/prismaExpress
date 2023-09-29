import { z } from 'zod'
import { zodBancos } from './bancos'
import { Request } from 'express'

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
