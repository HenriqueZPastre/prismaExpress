import { z } from 'zod'
import { zodBancos } from './bancos/zodBancos'
import { Request } from 'express'

export type createBancos = z.infer<typeof zodBancos.create>
export type listarBancos = z.infer<typeof zodBancos.listarBancos>

export interface ICreateBancos extends Request {
	body: {
		bancos: createBancos[]
	}
}

export interface IProcurarBancos extends Request {
	query: {
		search: string
	}
}

