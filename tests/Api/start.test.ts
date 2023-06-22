import supertest from 'supertest'
import { describe, it, expect } from 'vitest'

const url = 'https://prismaexpress.fly.dev'
describe('GET /tags', () => {
	it('star', async () => {
		await supertest(url).get('/tags').then((response) => {
			expect(response.status).be.equal(200)
			expect(response.body.data).be.an('array').and.have.length(15)
		})
	})
})

describe('ata', () => {
	it('stars', async () => {
		await supertest(url).post('/tags').send({ 'nome': 555 }).then((response) => {
			console.log(JSON.stringify(response.body))
			expect(response.status).be.equal(401)
		})
	})
})
