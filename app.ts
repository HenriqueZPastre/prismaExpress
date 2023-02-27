import express from 'express'
import { router } from './router'
import { tiposLancamentosInsert } from './create'

const app = express()
app.use(express.json())
const port = 3000
//app.use(express.json())
app.use(router)
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

tiposLancamentosInsert()
