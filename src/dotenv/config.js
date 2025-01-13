require('dotenv').config();

// API PORT
const PORT = process.env.API_PORT;

// BASE URL
const URL = process.env.BASE_URL;

// Redis config
const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  DEFAULT_EX: process.env.DEFAULT_EX,
};

module.exports = {
  PORT,
  URL,
  redisConfig,
};
