Promise = require 'bluebird'
_ = require 'lodash'

Conversion = require '../models/conversion'
RedisService = require '../services/redis'

HEALTHCHECK_TIMEOUT = 100

class HealthCtrl
  check: ->
    Promise.settle([
      Promise.cast(Conversion.findOne().exec()).timeout HEALTHCHECK_TIMEOUT
      RedisService.getAsync('NULL').timeout HEALTHCHECK_TIMEOUT
    ]).spread (mongoose, redis) ->
      result =
        Mongoose: mongoose.isFulfilled()
        Redis: redis.isFulfilled()

      result.healthy = _.every _.values result
      return result

module.exports = new HealthCtrl()
