_ = require 'lodash'
Promise = require 'bluebird'
log = require 'loglevel'

Experiments = require '../experiments'
config = require '../config'

overrides = {}

class ExperimentCtrl
  assign: (req) ->
    userId = req.body.userId
    userId ?= req.body.id # LEGACY
    fromUserId = req.body.fromUserId
    timestamp = if config.ENV is config.ENVS.PROD \
      then null
      else req.body.timestamp or null

    (if fromUserId then \
      Experiments.createUserIdMapping userId, fromUserId
    else
      Promise.resolve(null))
    .then ->
      Experiments.getParams userId
      .then (params) ->
        if overrides[userId]
          params = overrides[userId]
        log.info "ASSIGN: #{userId} #{JSON.stringify params}"
        Experiments.registerView params, userId, timestamp
        return params

  index: ->
    Experiments.getUsedParams().then (params) ->
      _.map params, (param) ->
        id: param

  override: (req) ->
    userId = req.body.userId
    params = req.body.params
    overrides[userId] = params

    return overrides


module.exports = new ExperimentCtrl()
