const { pool } = require('../config/db');

async function getAllUsers() {
  const [rows] = await pool.query(
    'SELECT id, name, email, created_at FROM users ORDER BY name ASC'
  );
  return rows;
}

module.exports = { getAllUsers };
