import { TodosOsParametrosDoPaginator } from 'src/utils/Paginator/Paginator'
import supertest from 'supertest'
import { describe, it, expect } from 'vitest'

const url = 'https://prismaexpress.fly.dev'
const r = supertest(url)

describe('Testes de GET na rota /tags', () => {
	it('Sucesso', async () => {
		await r.get('/tags').then((response) => {
			expect(response.status).be.equal(200)
			expect(response.body.data).be.an('array').and.have.length(15)
		})
	})

	it.only('All true', async () => {
		const params: TodosOsParametrosDoPaginator = {
			all: 'true',
			coluna: 'nome',
			order: 'desc',
			page: '0',
			take: '0',
		}
		await r.get(`/tags?all=${params.all}&coluna=${params.coluna}&order=${params.order}`).then((response) => {
			console.log(response.body.data)
		})
		it('stars', async () => {
			await r
				.post('/tags')
				.send({ 'nome': 555 })
				.then((response) => {
					console.log(JSON.stringify(response.body))
					expect(response.status).be.equal(401)
				})
		})
	})
})


