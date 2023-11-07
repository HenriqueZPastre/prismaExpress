
export interface user {
	id: number;
	create_at: Date;
	deletede_at: Date | null;
	update_at: Date | null;
	nome: string;
	email: string;
	telefone: string | null;
}

export interface usuario {
	email: string;
	password: string;
}

export interface IServiceAutenticacao {
	tokenExiste(token: string): Promise<{ existe: boolean, erro: Error | null }>
	criarToken(body: usuario): Promise<{ token: string | null, erro: Error | null }>
	validarExistenciaUsuario(body: usuario): Promise<{ usuario: user | null, erro: Error | null }>
	logout(token: string): Promise<void>
	lerToken(token: string): Promise<{ valido: boolean, erro: Error | null }>
}