import { generateSchema } from '@anatine/zod-openapi'
import { zodClientes } from './clientesZod'

export const modelsSwaggerClientes = {
	create : generateSchema(zodClientes.create),
	loginRequest : generateSchema(zodClientes.loginRequest)
}