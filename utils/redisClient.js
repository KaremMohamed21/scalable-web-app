const { createClient } = require("redis")

// Redis Client
let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error);

module.exports = redisClient;