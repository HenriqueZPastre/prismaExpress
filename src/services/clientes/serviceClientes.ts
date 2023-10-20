import { createClientes, loginRequest } from 'src/models/cliente/clientes.interface'
import { IServiceClientes } from './IServiceClientes'
import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'

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

	async login(data: loginRequest): Promise<{ token: string | null, erro: unknown }> {
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
			const { situacao } = await this.validarToken(token.token)
			console.log(situacao)
			if (!situacao) {
				const { token } = await this.criarToken(data)
				return { token: token, erro: null }
			}
		} else {
			const { token } = await this.criarToken(data)
			return { token: token, erro: null }
		}
		return { token: null, erro: 'Email ou senha incorretos' }
	}


	async criarToken(data: loginRequest): Promise<{ token: string }> {
		const secretKey = process.env.secretJwt
		if (!secretKey) throw new Error('Chave secreta não definida')
		const token = await jwt.sign(data, secretKey, { expiresIn: '300000' })
		console.log(token)
		await prisma.clientes.update({
			where: {
				email: data.email,
			},
			data: {
				token: token
			}
		})
		return { token: token }
	}

	async validarToken(token: string): Promise<{ situacao: boolean, erro: unknown }> {
		const secretKey = process.env.secretJwt
		if (secretKey) {
			jwt.verify(token, secretKey, (err: unknown, decoded: unknown) => {
				if (err instanceof jwt.TokenExpiredError) {
					console.error('Token expirado')
					return { situacao: false, erro: 'Token expirado' }
				} else if (err) {
					console.error('Erro na verificação do JWT:', err)
				} else {
					console.log('JWT verificado com sucesso. Decodificado:', decoded)
					return { situacao: true, erro: null }
				}
			})
		}
		return { situacao: false, erro: 'Erro ao verificar token' }
	}
	async logout(token: string): Promise<{ logout: boolean; }> {
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
			return { logout: true }
		} catch (error) {
			console.log('error')
			return { logout: false }
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