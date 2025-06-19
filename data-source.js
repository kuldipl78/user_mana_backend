const { DataSource } = require('typeorm');
const path = require('path');
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH || 'database.sqlite',
  synchronize: true, // Don't use this in production!
  entities: [path.join(__dirname, './entity/*.js')],
});

module.exports = { AppDataSource };
