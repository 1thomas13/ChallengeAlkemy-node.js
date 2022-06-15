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
        allowNull: false
    },
    title: {
        type: DataTypes.INTEGER
    },
    dateCreacion: {
        type: DataTypes.DATE
    },
    calificacion: {
        type: DataTypes.STRING
    },
  }, {
    timestamps: false
});
  

export default Movie