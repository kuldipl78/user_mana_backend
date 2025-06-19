const { DataSource } = require('typeorm');
const path = require('path');
require('dotenv').config();

try {
  require('better-sqlite3'); // 👈 ensures it's loaded
} catch (err) {
  console.error("❌ Failed to load better-sqlite3:", err);
}

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH || path.join('/tmp', 'database.sqlite'),
  synchronize: true,
  entities: [path.join(__dirname, './entity/*.js')],
});

module.exports = { AppDataSource };
