const path = require('path');
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: './src/migrations',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './src/migrations',
    },
  },

};