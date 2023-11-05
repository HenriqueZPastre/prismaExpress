import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'
import { loginRequest } from '../../../src/models/cliente/clientes.interface'
import { serviceClientes } from '../../../src/services/clientes/serviceClientes'

interface user {
	id: number;
	create_at: Date;
	deletede_at: Date | null;
	update_at: Date | null;
	nome: string;
	email: string;
	telefone: string | null;
}
const prisma = new PrismaClient()


const validarExistenciaUsuario = async (body: { email: string, senha: string, }) => {
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
			password: body.senha,
			deletede_at: null
		}
	})
	if (!existeUsuario) {
		throw new Error('Usuário ou senha inválidos')
	} else {
		criarToken(existeUsuario)
	}
}

const criarToken = async (body: user) => {
	const payload = body
	const secretKey = process.env.secretJwt
	if (!secretKey) throw new Error('Chave secreta não definida')
	const token = await jwt.sign(payload, secretKey, { expiresIn: '30000000' })
	console.log('Criado: ',token, ' end')
	await prisma.clientes.update({
		where: {
			id: body.id
		},
		data: {
			token: token
		}
	})

}

const user = {
	email: 'teste@uorak.com',
	password: 'teste123'
}


const validarToken = async (dados: loginRequest) => {
	const { erro, token } = await serviceClientes.login(dados)
	if (erro) {
		console.error(erro)
		return
	}

	const secretKey = process.env.secretJwt

	if (token && secretKey) {
		jwt.verify(token, secretKey, (err: unknown, decoded: unknown) => {
			if (err instanceof jwt.TokenExpiredError) {
				console.error('Token expirado')
			} else if (err) {
				console.error('Erro na verificação do JWT:', err)
			} else {
				console.log('JWT verificado com sucesso. Decodificado:', decoded)
			}
		})
	}
}

validarExistenciaUsuario({
	email: 'teste@uorak.com',
	senha: 'teste123'
})

