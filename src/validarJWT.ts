import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()
// Chave secreta para assinar o JWT
const secretKey = 'topSecretKey'

// Dados do usuário
const payload = {
	id: 123,
	username: 'usuario123'
}


const t = process.env.teste
console.log(t)

const token = jwt.sign(payload, secretKey, { expiresIn: '2 days' })

console.log('Token:', token)

// Verificar um JWT
jwt.verify(token, secretKey, (err: any, decoded: any) => {
	if (err) {
		console.error('Erro na verificação do JWT:', err)
	} else {
		console.log('JWT verificado com sucesso. Decodificado:', decoded)
	}
})
