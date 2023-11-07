import { createClientes, loginRequest } from 'src/models/cliente/clientes.interface'

export interface IServiceClientes {
	create(data: createClientes): Promise<{ situacao: boolean, erro: unknown }>
	login(data: loginRequest): Promise<{ token: string | null, erro: unknown }>
	logout(token: string): Promise<void>
}