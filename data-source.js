const { DataSource } = require('typeorm');
const path = require('path');
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE || path.join('/tmp', 'sqlite.db'),
  synchronize: true,
  entities: [path.join(__dirname, './entity/*.js')],
});

module.exports = { AppDataSource };
