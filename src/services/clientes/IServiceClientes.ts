import { createClientes, loginRequest } from 'src/models/cliente/clientes.interface'

export interface IServiceClientes {
	create(data: createClientes): Promise<{ situacao: boolean, erro: unknown }>
	login(data: loginRequest): Promise<{ token: string | null, erro: unknown }>
	criarToken(data: loginRequest): Promise<{ token: string }>
	validarToken(token: string): Promise<{ situacao: boolean, erro: unknown }>
	logout(token: string): Promise<{ logout: boolean }>
}