import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';  // Adjust the path as necessary

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add more attributes as needed
});

export default User;