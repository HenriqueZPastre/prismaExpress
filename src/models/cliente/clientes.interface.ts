import { Request } from 'express'
import { zodClientes } from './clientesZod'
import z from 'zod'

export type createClientes = z.infer<typeof zodClientes.create>
export type loginRequest = z.infer<typeof zodClientes.loginRequest>

export interface ICreateClientes extends Request {
	body: {
		data: createClientes
	}
}

export interface ILoginClientes extends Request {
	body: {
		data: loginRequest
	}
}

