require('dotenv').config();

// API PORT
const PORT = process.env.API_PORT || '3050';

// BASE URL
const URL = process.env.BASE_URL || 'http://127.0.0.1';

// Redis config
const redisConfig = {
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || '6379',
  password: process.env.REDIS_PASSWORD || 'redis_secret',
  DEFAULT_EX: process.env.DEFAULT_EX || '86400',
};

module.exports = {
  PORT,
  URL,
  redisConfig,
};
