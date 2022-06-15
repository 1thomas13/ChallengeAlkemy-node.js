import express from 'express'
const app = express()

app.use(express.json());

app.get('/',(req,res) => {
	return res.status(200).json('Index')
})

import charactersRoutes from './characters/routes.js'

app.use('/characters', charactersRoutes)



app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
