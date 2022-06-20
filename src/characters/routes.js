import express from 'express'
import { addCharacter, deleteCharacter,getDetailCharacter, editCharacter, getAllCharacters } from './controllers.js'
import {validateToken} from '../middlewares/middlewares.js' 
import { validateEditCharacters, validateNewCharacters } from './middlewares.js'

const router = express.Router()

router.get('/', validateToken,getAllCharacters)

router.get('/:id', validateToken, getDetailCharacter)

router.post('/', validateNewCharacters, validateToken, addCharacter)

router.put('/:id', validateToken, validateEditCharacters, editCharacter)

router.delete('/:id', validateToken, deleteCharacter)

export default router