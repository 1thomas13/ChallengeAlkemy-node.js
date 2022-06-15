import sequelize from '../config/connection.js'
import { DataTypes } from 'sequelize';

const MovieCharacter = sequelize.define('MovieCharacter', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    }
  }, {
    timestamps: false
});

export default MovieCharacter