const { DataSource } = require('typeorm');
const path = require('path');
require('dotenv').config();

// 👇 Ensures better-sqlite3 is loaded (required by TypeORM for compatibility)
require('better-sqlite3');

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH || path.join('/tmp', 'database.sqlite'), // ✅ use /tmp for writable storage in Render
  synchronize: true, // ⚠️ For dev only, not safe for production
  entities: [path.join(__dirname, './entity/*.js')],
});

module.exports = { AppDataSource };
