import express from 'express'
import { router } from './router'

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000
app.use(router)
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
	console.log('http://localhost:3000/')
})
app.use('/api', router)
