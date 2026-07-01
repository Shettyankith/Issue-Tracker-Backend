const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const env = require('../config/env');
const AppError = require('../utils/AppError');

const SALT_ROUNDS = 10;

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn }
  );
}

function sanitizeUser(user) {
  const { password_hash, ...safeUser } = user;
  return safeUser;
}

async function register({ name, email, password }) {
  const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    throw new AppError('Email already registered', 409);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, passwordHash]
  );

  const user = {
    id: result.insertId,
    name,
    email,
    created_at: new Date(),
  };

  return { user, token: generateToken(user) };
}

async function login({ email, password }) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) {
    throw new AppError('Invalid email or password', 401);
  }

  const user = rows[0];
  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    throw new AppError('Invalid email or password', 401);
  }

  return { user: sanitizeUser(user), token: generateToken(user) };
}

async function getUserById(id) {
  const [rows] = await pool.query(
    'SELECT id, name, email, created_at FROM users WHERE id = ?',
    [id]
  );

  if (rows.length === 0) {
    throw new AppError('User not found', 404);
  }

  return rows[0];
}

module.exports = { register, login, getUserById };
