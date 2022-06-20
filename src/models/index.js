import sequelize from '../config/connection.js'

import Movie from './Movie.js'
import Character from './Character.js'
import User from './User.js'
import Genre from './Genre.js'
import MovieCharacter from './MovieCharacter.js'


Movie.hasMany(MovieCharacter, { foreignKey: 'movieId' })
Character.hasMany(MovieCharacter, { foreignKey: 'characterId' })
Genre.hasMany(Movie, { foreignKey: 'genreId' })

;(async () => {
    await sequelize.sync({ force: true });
    console.log('Database & tables created!')

    await Genre.create({
        img: 'https:',
        name: 'Adventure'
      })
    
    await Genre.create({
        img: 'hhas',
        name: 'Action'
    })


})()

export  {
    Movie, Character, User, Genre, MovieCharacter
}