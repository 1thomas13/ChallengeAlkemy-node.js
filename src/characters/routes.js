import express from 'express'
import { addCharacter, deleteCharacter,getDetailCharacter, editCharacter, getAllCharacters } from './controllers.js'
import {validateToken} from '../middlewares/middlewares.js' 

const router = express.Router()

router.get('/', validateToken,getAllCharacters)

router.get('/:id', validateToken, getDetailCharacter)

router.post('/', validateToken, addCharacter)

router.patch('/:id', validateToken, editCharacter)

router.delete('/:id', validateToken, deleteCharacter)

export default router