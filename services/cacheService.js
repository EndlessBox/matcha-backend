var redis = require("redis");
const config = require("../config/config");
const promisify = require("util").promisify;
var redisClient = null;

module.exports = class cacheService {
  constructor() {}

  createCacheClient() {
    try {
      if (!redisClient)
        redisClient = redis.createClient({
          host: config.redisHost,
          port: config.redisPort,
        });
      return redisClient;
    } catch (err) {
      throw err;
    }
  }

  async getUserSocketId(userId) {
    try {
      return this.get(redisClient)(userId);
    } catch (err) {
      throw err;
    }
  }

  async setNewCacheEntry(key, value) {
    try {
      await this.set(redisClient)(key, value);
    } catch (err) {
      throw err;
    }
  }

  async deleteCacheEntry(userId) {
    try {
      await redisClient.del(userId);
    } catch (err) {
      throw err;
    }
  }

  get() {
    return promisify(redisClient.get).bind(redisClient);
  }

  set() {
    return promisify(redisClient.set).bind(redisClient);
  }
};
