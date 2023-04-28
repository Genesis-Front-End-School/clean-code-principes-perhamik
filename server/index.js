import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
app.use(cors())
const port = 4040

app.get('/courses', async function (req, res) {
	try {
		const request = await fetch(`http://api.wisey.app/api/v1/core/preview-courses`, {
			headers: {
				Authorization: `Bearer ${process.env.API_TOKEN}`,
			},
		})
		const data = await request.json()
		res.json(data)
	} catch (err) {
		res.json(err)
	}
})

app.get('/courses/:id', async function (req, res) {
	const id = req.params?.id || ''
	try {
		const request = await fetch(`http://api.wisey.app/api/v1/core/preview-courses/${id}`, {
			headers: {
				Authorization: `Bearer ${process.env.API_TOKEN}`,
			},
		})
		const data = await request.json()
		res.json(data)
	} catch (err) {
		res.json(err)
	}
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
