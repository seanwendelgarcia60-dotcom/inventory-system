require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sql, poolPromise } = require('./config/db');

async function seed() {
  const pool = await poolPromise;
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await pool.request()
    .input('username', sql.NVarChar, 'admin')
    .input('password_hash', sql.NVarChar, hashedPassword)
    .query(`INSERT INTO Users (username, password_hash) VALUES (@username, @password_hash)`);

  console.log('✅ Admin user created: username=admin, password=admin123');
  process.exit(0);
}

seed();