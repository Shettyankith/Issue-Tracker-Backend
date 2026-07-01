const app = require('./app');
const env = require('./config/env');
const { testConnection } = require('./config/db');

async function startServer() {
  try {
    await testConnection();
    console.log('Database connected successfully');

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port} (${env.nodeEnv})`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
