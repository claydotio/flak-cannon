Promise = require 'bluebird'
_ = require 'lodash'
mongoose = require 'mongoose'

Conversion = require '../models/conversion'
RedisService = require '../services/redis'

HEALTHCHECK_TIMEOUT = 100

class HealthCtrl
  check: ->
    Promise.settle([
      RedisService.getAsync('NULL').timeout HEALTHCHECK_TIMEOUT
    ]).spread (redis) ->
      result =
        Redis: redis.isFulfilled()
        Mongoose: mongoose.connection.readyState is 1

      result.healthy = _.every _.values result
      return result

  ping: -> 'pong'

module.exports = new HealthCtrl()
