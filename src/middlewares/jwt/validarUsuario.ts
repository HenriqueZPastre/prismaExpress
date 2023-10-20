import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'
import { getTokenUser } from './validarJWT'

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
	const token = await jwt.sign(payload, secretKey, { expiresIn: '300000' })
	console.log(token)
	await prisma.clientes.update({
		where: {
			id: body.id
		},
		data: {
			token: token
		}
	})
	
}

validarExistenciaUsuario({
	email: 'teste@uorak.com',
	senha: 'teste123'
})