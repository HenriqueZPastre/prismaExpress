import { createClientes } from 'src/models/cliente/clientes.interface'
import { IServiceClientes } from './IServiceClientes'
import { PrismaClient } from '@prisma/client'
import { serviceAutenticacao } from '../autenticacao/serviceAutenticacao'
import { usuario } from '../autenticacao/IServiceAutenticacao'

const prisma = new PrismaClient()

class ServiceClientes implements IServiceClientes {
	async create(data: createClientes): Promise<{ situacao: boolean, erro: unknown }> {
		const create = await prisma.clientes.create({
			data: {
				nome: data.nome,
				email: data.email,
				password: data.password,
				telefone: data.telefone,
			}
		})
		if (create) {
			return { situacao: true, erro: null }
		} else {
			return { situacao: false, erro: 'Erro ao criar cliente' }
		}
	}

	async login(data: usuario): Promise<{ token: string | null, erro: unknown }> {
		const token = await prisma.clientes.findFirst({
			select: {
				token: true,
			},
			where: {
				email: data.email,
				password: data.password,
			}
		})
		if (token && token.token) {
			const { valido, erro } = await serviceAutenticacao.lerToken(token.token)
			if (erro) {
				return { token: null, erro: erro }
			}
			if (!valido) {
				const { token } = await serviceAutenticacao.criarToken(data)
				return { token: token, erro: null }
			} else {
				return { token: token?.token, erro: null }
			}
		}
		return { token: null, erro: 'Email ou senha incorretos' }
	}

	async logout(token: string): Promise<void> {
		try {
			const exit = await prisma.clientes.findFirst({
				select: {
					id: true,
				},
				where: {
					token: token,
				},
			})
			await prisma.clientes.update({
				where: {
					id: exit?.id,
				},
				data: {
					token: null,
				}

			})
			console.log('exit')
		} catch (error) {
			console.log('error')
		}
	}
}


export const serviceClientes = new ServiceClientes()
const start = async () => {
	await serviceClientes.login({
		email: 'teste@uorak.com',
		password: 'teste123'
	})

}
start()

//serviceClientes.logout('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHVvcmFrLmNvbSIsInBhc3N3b3JkIjoidGVzdGUxMjMiLCJpYXQiOjE2OTc4MzM4NzMsImV4cCI6MTY5NzgzNDE3M30.mOcqnrr0gRdnGie6C9vZENrsjkceCY67BkO8GaBr6KA')