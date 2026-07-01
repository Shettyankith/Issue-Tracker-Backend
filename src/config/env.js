require('dotenv').config();

const requiredEnvVars = [
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
  'JWT_SECRET',
];

function getEnvVar(name, defaultValue) {
  const value = process.env[name] ?? defaultValue;
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

for (const name of requiredEnvVars) {
  getEnvVar(name);
}

const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    host: getEnvVar('DB_HOST'),
    port: Number(process.env.DB_PORT) || 3306,
    user: getEnvVar('DB_USER'),
    password: getEnvVar('DB_PASSWORD'),
    database: getEnvVar('DB_NAME'),
  },
  jwt: {
    secret: getEnvVar('JWT_SECRET'),
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
};

module.exports = env;
