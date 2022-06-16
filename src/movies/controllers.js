import { Movie, MovieCharacter } from "../models/index.js"

export const allMovies = async(req,res) => {

    try {

        const movies = await Movie.findAll({
            attributes: ['img', 'title', 'dateCreation']
        })
        
        if(movies.length === 0) {
            return res.status(400).json({msg:'No movies/serie yet'})
        }

        res.status(200).json({msg:movies})

    } catch (error) {
        console.log(error)
        res.status(400).json({msg: error})
    }
}

export const getDetailMovie = async(req,res) => {

    const {id} = req.params

    const movie = await Movie.findOne({where: {id:id}, include: MovieCharacter})

    if(!movie){
        return res.status(400).json({msg:'The movie/serie not exist!'})
    }

    res.json({msg: movie})
}

export const createMovie = async(req,res) => {

    const {img, dateCreation, title, calificacion} = req.body

    if(!img || !dateCreation || !title || !calificacion){
        return res.status(400).json({msg:'Fill in the fields!'})
    }

    if(calificacion < 1 || calificacion > 5){
        return res.status(400).json({msg:'The rating is from 1 to 5'})
    }

    const movie  = {
        img,
        dateCreation,
        title,
        calificacion
    }
    try {
        await Movie.create(movie)

        res.json({msg: 'Movie created successfully'})

    } catch (error) {
        console.log(error)
        res.status(400).json({msg: error})
    }
 
    
}

export const editMovie = async(req,res) => {

    const {id} = req.params
    const {img, title, dateCreation, calificacion} = req.body

   try {

        const movie = await Movie.findOne({where: {id:id}})

        if(!movie){
            return res.status(404).json({ msg: 'Movie/serie not exist' })
        }
     
        movie.img = img || movie.img
        movie.title = title || movie.title
        movie.dateCreation = dateCreation || movie.dateCreation
        movie.calificacion = calificacion || movie.calificacion
    
        await movie.save()

        res.json({msg:'Successfully modified Movie/serie'})

   } catch (error) {
        console.log(error)
        res.status(400).json({msg: error})
   }
}

export const deleteMovie = async(req,res) => {

    const {id} = req.params

   try {

        const movie = await Movie.findOne({where: {id:id}})

        if(!movie){
            return res.status(404).json({ msg: 'Movie/serie not exist' })
        }

        await movie.destroy()

        res.json({msg: 'Successfully deleted Movie/serie'})

   } catch (error) {
        console.log(error)
        res.status(400).json({msg: error})
   }
 
}