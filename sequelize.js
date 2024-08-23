import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

// Define multiple models
const models = {
  Blog: sequelize.define('blog', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    blogs: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }),
  User: sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  }),
 
};

// Sync all models with the database
sequelize.sync().then(() => {
  console.log('Tables created successfully!');
}).catch((error) => {
  console.error('Error creating tables:', error);
});
export default models;