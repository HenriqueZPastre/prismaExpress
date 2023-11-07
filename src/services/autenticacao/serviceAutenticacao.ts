import { PrismaClient } from '@prisma/client'
import { IServiceAutenticacao, user, usuario } from './IServiceAutenticacao'
import * as jwt from 'jsonwebtoken'

class Autenticacao implements IServiceAutenticacao {
	async tokenExiste(token: string): Promise<{ existe: boolean, erro: Error | null }> {
		const prisma = new PrismaClient()

		const existeToken = await prisma.clientes.findFirst({
			where: {
				token: token
			}
		})

		await prisma.$disconnect()

		if (existeToken) {
			return { existe: true, erro: null }
		} else {
			return { existe: false, erro: null }
		}
	}
	async criarToken(body: usuario): Promise<{ token: string | null, erro: Error | null }> {
		const prisma = new PrismaClient()
		const { usuario, erro } = await this.validarExistenciaUsuario(body)

		if (erro) return { token: null, erro: erro }
		if (!usuario) return { token: null, erro: new Error('Usuário ou senha inválidos') }

		const secretKey = process.env.secretJwt
		if (!secretKey) return { token: null, erro: new Error('Chave secreta não definida') }
		
		const token = await jwt.sign(usuario, secretKey, { expiresIn: '30000000' })
		console.log('Criado: ', token, ' end')
		await prisma.clientes.update({
			where: {
				id: usuario.id
			},
			data: {
				token: token
			}
		})
		await prisma.$disconnect()
		return { token: token, erro: null }
	}

	async validarExistenciaUsuario(body: usuario): Promise<{ usuario: user | null, erro: Error | null }> {
		const prisma = new PrismaClient()
		const existeUsuario = await prisma.clientes.findFirst({
			select: {
				id: true,
				nome: true,
				email: true,
				telefone: true,
				update_at: true,
				create_at: true,
				deletede_at: true,
			},
			where: {
				email: body.email,
				password: body.password,
				deletede_at: null
			}
		})
		await prisma.$disconnect()
		if (!existeUsuario) {
			return { usuario: null, erro: new Error('Usuário ou senha inválidos') }
		} else {
			return { usuario: existeUsuario, erro: null }
		}
	}
	async logout(token: string): Promise<void> {
		const prisma = new PrismaClient()
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
		}
		catch (error) {
			console.log(error)

		}
	}
	async lerToken(token: string): Promise<{ valido: boolean, erro: Error | null }> {
		const secretKey = process.env.secretJwt
		let valido = false

		if (!secretKey) return { valido: false, erro: new Error('Chave secreta não definida') }
		jwt.verify(token, secretKey, (err: unknown, decoded: unknown) => {
			if (decoded) {
				console.log('decoded', decoded)
				valido = true
			}
			if (err instanceof jwt.TokenExpiredError) {
				console.error('Token expirado')
			} else if (err) {
				console.error('Erro na verificação do JWT:', err)
			} else {
				console.log('JWT verificado com sucesso. Decodificado:', decoded)
			}
		})
		return { valido: valido, erro: null }
	}
}


export const serviceAutenticacao = new Autenticacao()