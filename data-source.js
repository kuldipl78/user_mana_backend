const { DataSource } = require('typeorm');
const path = require('path');
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH || path.join('/tmp', 'database.sqlite'), // 👈 update here
  synchronize: true,
  entities: [path.join(__dirname, './entity/*.js')],
});

module.exports = { AppDataSource };
