import sequelize from '../config/connection.js'
import { DataTypes } from 'sequelize';

const Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    img: {
        type: DataTypes.STRING,
    },
    title: {
        type: DataTypes.STRING
    },
    dateCreation: {
        type: DataTypes.STRING
    },
    calificacion: {
        type: DataTypes.INTEGER
    },
  }, {
    timestamps: false
});
  

export default Movie