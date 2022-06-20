import {Character, MovieCharacter, Movie} from '../models/index.js'

export const validateNewCharacters = async(req,res,next) => {

    const {characters} = req.body

    if(!characters) {
       return res.status(200).json({msg: 'You must enter data to create characters'})
    }

    
    for await (let character of characters) {

        if(!character.img || !character.name || !character.age || !character.weight || !character.history) {
            return res.status(400).json({msg:'You must complete all the fields'})
        }

        if(!character.movies) {
            return res.status(400).json({msg:'You must assign at least one movie or series to a character'})
        }

       
        for (let movie of character.movies){
               
            if(movie.movieId) {
                    
                const selectedMovie = await Movie.findOne({where:{id:movie.movieId}})

                if(!selectedMovie) {
                    return res.status(400).json({msg:`He id ${movie.movieId} does not belong to a movie or series`})
                }

            }else {
                return res.status(404).json({msg:`movieId does not exist`})
            }
        }  
    }


    next()

}

export const validateEditCharacters = async(req,res,next) => {

    const {movies} = req.body

    if(movies){
        for await(let movie of movies) {
            if(!movie.movieId){
                return res.status(400).json({msg:`you must enter an id of a movie`})
            }

            const validateMovie = await Movie.findOne({where:{id:movie.movieId}})

            if(!validateMovie){
                return res.status(404).json({msg:`The movie with id ${movie.movieId} not exist`})
            }
        }
    }

    next()

}