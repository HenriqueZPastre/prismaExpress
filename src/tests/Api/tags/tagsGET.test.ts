import supertest from 'supertest'
import { describe, it, expect } from 'vitest'

const url = 'https://prismaexpress.fly.dev/tags'
const r = supertest(url)

describe('Testes de GET na rota /tags', () => {
	it('Sucesso', async () => {
		await r.get('').then((response) => {
			expect(response.status).be.equal(200)
			expect(response.body.data).be.an('array').and.have.length(15)
		})
	})

	it('All true', async () => {
		await r.get('?all=true').then((response) => {
			expect(response.status).be.equal(200)
			expect(response.body.data).be.an('array')
			expect(response.body.data.length).toBeGreaterThan(15)
		})
	})

	it('Take falha se all=true', async () => {
		const take = 2
		await r.get('?all=true&take=' + take).then((response) => {
			expect(response.status).be.equal(200)
			expect(response.body.data).be.an('array')
			expect(response.body.data.length).not.eq(take)
		})
	})

	it('Take sucess', async () => {
		const take = 2
		await r.get('?take=' + take).then((response) => {
			expect(response.status).be.equal(200)
			expect(response.body.data).be.an('array')
			expect(response.body.data.length).eq(take)
		})
	})

	it('stars', async () => {
		await r
			.post('')
			.send({ 'nome': 555 })
			.then((response) => {
				console.log(JSON.stringify(response.body))
				expect(response.status).be.equal(401)
			})
	})
})


