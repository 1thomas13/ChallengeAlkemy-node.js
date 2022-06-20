import {Character, MovieCharacter, Movie} from '../models/index.js'
import { Op } from 'sequelize'

export const addCharacter = async(req,res) => {
  
    const {characters} = req.body

    for await (let character of characters) {

        const newCharacter = await Character.create(character)

        for (let movie of character.movies){
                      
            const selectedMovie = await Movie.findOne({where:{id:movie.movieId}})
                
            const movieCharacter = {
                movieId: selectedMovie.id,
               characterId: newCharacter.id
            }

            await MovieCharacter.create(movieCharacter)
        }
    } 

    res.json({msg: 'Character/s creates succesfully'})
    
}

export const getAllCharacters = async(req,res) => {

    const {age,name,movies,weight} = req.query

    const query = {}
    
    if (name) query.name = name
    if (age) query.age = age
    if (weight) query.weight = weight

    if (movies) {
        const characterMovies = await MovieCharacter.findAll({
          where: { movieId: movies }
        })

        if(characterMovies.length === 0) {
            return res.status(404).json({msg:'No character found'})
        }

        const arrayAssocieatedMovies = characterMovies.map(characterMovie => characterMovie.characterId)

        query.id = {[Op.or]: arrayAssocieatedMovies}

        const charactersWithMovies = await Character.findAll({
            where:query,
            attributes: ['img', 'name']
        })
        
        return res.status(200).json({ msg: charactersWithMovies })
    }

    const characters = await Character.findAll({
        where: query,
        attributes: ['img', 'name']
    })

    
    if(characters.length === 0) {
        return res.status(404).json({msg:'No character found'})
    }

    res.json({msg:characters})
}

export const getDetailCharacter = async(req,res) => {

    const {id} = req.params
    
    const character = await Character.findOne({where: {id:id}, include: [
        {
          model: MovieCharacter,
          attributes: ['movieId']
        }
    ]})

    if(!character){
        return res.status(404).json({msg:'The character not exist!'})
    }

    res.json({msg:character})
}

export const editCharacter = async(req,res) => {

    const {id} = req.params
    const {img, name, age, weight, history, movies} = req.body

    const character = await Character.findOne({where: {id:id}})

    if (!character){
        return res.status(404).json({ msg: 'Character not exist' })
    }
      
    character.img = img || character.img
    character.name = name || character.name
    character.age = age || character.age
    character.weight = weight || character.weight
    character.history = history || character.history

    if(movies){
        const movieCharacters = await MovieCharacter.findAll({where: {characterId:character.id}})

        const currentAssociatedMovies = movieCharacters.map((movie)=>{
            return movie.movieId
        })
    
        const futureAssociatedMovies = movies.map((movie)=>{
            return movie.movieId
        })
    
        const newAssociatedMovies = movies.filter( movie => (currentAssociatedMovies.includes(movie.movieId) ? false : true))
            
        newAssociatedMovies.forEach( async (newMovies) => {
    
            const movieCharacter = {
                movieId: newMovies.movieId,
                characterId: character.id
            }
            
            await MovieCharacter.create(movieCharacter)
        });  
            
        const deleteAssociatedMovies = movieCharacters.filter( movie => (futureAssociatedMovies.includes(movie.movieId) ? false : true))
        
        deleteAssociatedMovies.forEach(async (deleteMovie)=>{
            await MovieCharacter.destroy({where: {movieId:deleteMovie.movieId, characterId: character.id}})
        }) 
    }
   
        
    res.json({msg:'Successfully modified character'})
}

export const deleteCharacter = async(req,res) => {

    const {id} = req.params

    const character = await Character.findOne({where:{id:id}})

    if(!character){
        return res.status(404).json({ msg: 'Character not exist' })
    }

    await MovieCharacter.destroy({where:{characterId:character.id}})

    await character.destroy()

    res.json({msg: 'Successfully deleted character'})
}