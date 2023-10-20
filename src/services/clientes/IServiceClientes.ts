import { createClientes, loginRequest } from 'src/models/cliente/clientes.interface'

export interface IServiceClientes {
	create(data: createClientes): Promise<{ situacao: boolean, erro: unknown }>
	login(data: loginRequest): Promise<{ token: string | null, erro: unknown }>
	clienteExiste(data: loginRequest): Promise<{ existe: boolean | null, erro: unknown, token: string | null }>
	criarToken(data: loginRequest): Promise<{ token: string }>
	validarToken(token: string): { situacao: boolean, erro: unknown }
}