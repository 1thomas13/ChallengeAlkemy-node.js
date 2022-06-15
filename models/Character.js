import sequelize from '../config/connection.js'
import { DataTypes } from 'sequelize';

const Character = sequelize.define('Character', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    peso: {
        type: DataTypes.STRING
    },
    history: {
        type: DataTypes.STRING
    },
  }, {
    timestamps: false
});

export default Character