redis = require 'redis'
log = require 'loglevel'
Promise = require 'bluebird'

config = require '../config'

client = redis.createClient config.REDIS.PORT, config.REDIS.HOST

client.on 'error', log.trace

module.exports = Promise.promisifyAll client
