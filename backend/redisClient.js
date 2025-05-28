// redisClient.js
const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://localhost:6379' // default local Redis
});

redisClient.connect().catch(console.error);

module.exports = redisClient;
