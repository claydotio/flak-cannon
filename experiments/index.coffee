_ = require 'lodash'
Promise = require 'bluebird'
log = require 'loglevel'

Events = require '../lib/events'
experiments = require './experiment_list'
config = require '../config'
RedisService = require '../services/redis'

# Internal usage at clay.io
unless config.ENV is config.ENVS.TEST
  try
    experiments = require 'clay-flak-cannon-experiments'
  catch e
    null

log.info '# Experiments: ', experiments.length

getUserIdMapping = (userId) ->
  RedisService.getAsync config.REDIS.PREFIX + ':' + userId
  .then (mappedUserId) ->
    return mappedUserId or userId

module.exports =
  getParams: (userId) ->
    getUserIdMapping userId
    .then (userId) ->
      Promise.resolve _.reduce experiments, (params, experiment) ->
        _.defaults params, experiment.assign(userId)
      , {}
  registerView: (params, userId, timestamp) ->
    Events.emit 'experiments|index|getParams', {params, userId, timestamp}
  getUsedParams: ->
    Promise.resolve _.flatten _.pluck experiments, 'params'

  createUserIdMapping: (from, to) ->
    RedisService.setAsync config.REDIS.PREFIX + ':' + from, to
