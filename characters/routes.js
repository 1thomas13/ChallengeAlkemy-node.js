import express from 'express'
import { addCharacter, getAllCharacters } from './controllers.js'

const router = express.Router()

router.get('/', getAllCharacters)

router.post('/', addCharacter)

export default router