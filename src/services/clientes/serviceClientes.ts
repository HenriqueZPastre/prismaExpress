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
			return { token: token.token, erro: null }
		}
		return { token: null, erro: 'Email ou senha incorretos' }
	}

	async clienteExiste(data: loginRequest): Promise<{ existe: boolean | null; erro: unknown, token: string | null }> {
		const existe = await prisma.clientes.findFirst({
			select: {
				token: true,
			},
			where: {
				email: data.email,
				password: data.password,
			}
		})
		if (existe?.token) {
			const { erro, situacao } = this.validarToken(existe.token)
			if (erro) {
				console.log(erro)
				return { existe: false, erro: erro, token: null }
			}
			if (!situacao) {
				const token = await this.criarToken(data)
				return { existe: true, erro: null, token: token.token }
			}
		} else {
			return { existe: false, erro: 'Email ou senha incorretos', token: null }
		}

		return { existe: false, erro: 'Erro ao verificar cliente', token: null }

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

	validarToken(token: string): { situacao: boolean, erro: unknown } {
		const secretKey = process.env.secretJwt
		if (secretKey) {
			jwt.verify(token, secretKey, (err: unknown, decoded: unknown) => {
				if (err instanceof jwt.TokenExpiredError) {
					console.error('Token expirado')
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
}


export const serviceClientes = new ServiceClientes()