const { DataSource } = require('typeorm');
const path = require('path');
require('dotenv').config();

// 👇 Optional but safe to include to ensure the package loads
require('better-sqlite3');

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH || path.join('/tmp', 'database.sqlite'), // ✅ Use /tmp for Render
  synchronize: true,
  entities: [path.join(__dirname, './entity/*.js')],
});

module.exports = { AppDataSource };
