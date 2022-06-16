import express from 'express'
import { allMovies, createMovie, deleteMovie, editMovie, getDetailMovie } from './controllers.js'
import {validateToken} from '../middlewares/middlewares.js' 
const router = express.Router()

router.get('/', validateToken, allMovies)

router.get('/:id', validateToken, getDetailMovie)

router.post('/', validateToken, createMovie)

router.patch('/:id', validateToken, editMovie)

router.delete('/:id', validateToken, deleteMovie)

export default router