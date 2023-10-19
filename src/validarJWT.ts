import * as jwt from 'jsonwebtoken'

// Chave secreta para assinar o JWT
const secretKey = 'topSecretKey'

// Dados do usuário
const payload = {
	id: 123,
	username: 'usuario123'
}

// Criar um JWT
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
