import { Response } from "express"

type tipo = 'Erro' | 'Mensagem' | 'Meta'

type Meta = {
	mensagem?: | number | object | object[] | undefined,
	erro: string | number | object | object[] | undefined,
	paginas?: | number | object | object[] | undefined,
	registros?: | number | object | object[] | undefined,
}

/**
 * Recebe e retorna um Response do Express 
 * 
 * StatusCode da request
 * 
 * Em caso de passar uma mensagem Tipo = "ERRO" | "MENSAGEM"
 * 
 * O Campo mensagem aceita string | object | object[ ]
 */
export const HandleResponse = (response: Response, statusCode: number, informacao?: string | object | object[] | number | null, tipo?: tipo, obj?: Meta): Response => {
	type pai = {
		data?: filho
	}

	type filho = {
		error?: string | number | object | object[] | undefined,
		message?: string | number | object | object[] | undefined,
		paginas?: string | number | object | object[] | undefined,
		registros?: string | number | object | object[] | undefined,

	}


	let texto: pai = { "data": {} }
	if (tipo) {
		if (!obj) {
		} else {
			obj.mensagem ? texto.data = { message: obj.mensagem } : null
			obj.erro ? texto.data = { error: obj.erro } : null
			obj.paginas ? texto.data = { paginas: obj.paginas } : null
			obj.registros ? texto.data = { registros: obj.registros } : null
		}

	}
	const registros = texto.data?.registros
	const paginas = texto.data?.paginas
	const error = texto.data?.error
	const message = texto.data?.message

	if (informacao) {
		return response.status(statusCode).json({ data: informacao, registros, paginas, error, message })
	}
	return response.status(statusCode).json()
}


//EXEMPLO DE OUTRA FUNÇÂO
/* export type ost = {
	response: Response,
	statusCode: number,
	tipo?: 'Erro' | 'Mensagem',
	message?: string,
	objeto?: object[]
}
export const testex = (params: ost): Response => {
	let data = {
		data: [{}],
		message: '',
		error: ''
	}
	if (params.objeto) {
		data.data = params.objeto
	}
	if (params.message && params.tipo) {
		if (params.tipo === 'Erro') {
			data.error = params.message
		} else {
			data.message = params.message
		}
	}
	return params.response.status(params.statusCode).json(data)
} */
