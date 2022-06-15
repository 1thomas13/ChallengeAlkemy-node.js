import sequelize from '../config/connection.js'
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
  }, {
    timestamps: false
});

export default User