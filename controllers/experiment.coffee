_ = require 'lodash'
Promise = require 'bluebird'

Experiments = require '../experiments'
config = require '../config'

class ExperimentCtrl
  assign: (req) ->
    userId = req.body.userId
    userId ?= req.body.id # LEGACY
    fromUserId = req.body.fromUserId
    timestamp = if config.ENV is config.ENVS.PROD \
      then null
      else req.body.timestamp or null

    if fromUserId
      Experiments.createUserIdMapping userId, fromUserId
      .then ->
        Experiments.getParams userId
        .then (params) ->
          Experiments.registerView params, userId, timestamp
          return params
    else
      Experiments.getParams userId
      .then (params) ->
        Experiments.registerView params, userId, timestamp
        return params

  index: ->
    Experiments.getUsedParams().then (params) ->
      _.map params, (param) ->
        id: param

module.exports = new ExperimentCtrl()
