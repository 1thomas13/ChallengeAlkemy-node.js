import sequelize from '../config/connection.js'
import { DataTypes } from 'sequelize';

const Genre = sequelize.define('Genre', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING
    }
  }, {
    timestamps: false
});

export default Genre