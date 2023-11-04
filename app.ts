import express from 'express'
import { router } from './router'

const app = express()
app.use(express.json({ limit: '50mb'}))
const port = process.env.PORT || 3000
app.use(router)
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
	console.log('http://localhost:3000/')
})
app.use('/api', router)

const memoryUsage = process.memoryUsage()
const convertedMemoryUsage = {
	rss: (memoryUsage.rss / 1024 / 1024).toFixed(2), // Resident Set Size (total memory usage)
	heapTotal: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2), // Total heap usage
	heapUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2) // Heap actually used
}

console.log(`Memory Usage (MB): ${JSON.stringify(convertedMemoryUsage)}`)
