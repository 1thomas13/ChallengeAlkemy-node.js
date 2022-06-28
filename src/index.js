import express from 'express'
import cors from 'cors'
const app = express()
import dotenv from 'dotenv'


dotenv.config()

app.use(express.json());
app.use(cors())


app.get('/',(req,res) => {
	return res.status(200).json('Index')
})

import charactersRoutes from './characters/routes.js'
import authRoutes from './auth/routes.js'
import moviesRoutes from './movies/routes.js'

app.use('/characters', charactersRoutes)
app.use('/auth', authRoutes)
app.use('/movies', moviesRoutes)

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})

export default app
