_ = require 'lodash'
Promise = require 'bluebird'
log = require 'loglevel'

Experiments = require '../experiments'
config = require '../config'

overrides = {}

registerViewEvents = (isOrganic, params, userId, timestamp) ->
  (if isOrganic
    log.info "ASSIGN: #{userId} #{JSON.stringify params}"
    Experiments.registerAssignment params, userId, timestamp
  else Promise.resolve(null))
  .then ->
    log.info "VIEW: #{userId} #{JSON.stringify params}"
    return Experiments.registerView params, userId, timestamp

class ExperimentCtrl
  assign: (req) ->
    userId = req.body.userId and String req.body.userId
    unless userId # LEGACY
      userId = req.body.id and String req.body.id
    fromUserId = req.body.fromUserId and String req.body.fromUserId
    timestamp = if config.ENV is config.ENVS.PROD \
      then null
      else req.body.timestamp or null
    isBot = userId is config.CRAWLER_USER_ID

    if isBot
      return {}

    (if fromUserId then \
      Experiments.createUserIdMapping userId, fromUserId
    else
      Promise.resolve(null))
    .then ->
      Experiments.getParams userId
      .then ([params, isOrganic]) ->
        if overrides[userId]
          params = overrides[userId]

        registerViewEvents(isOrganic, params, userId, timestamp)
        .then ->
          return params

  index: ->
    Experiments.getUsedParams().then (params) ->
      _.map params, (param) ->
        id: param

  override: (req) ->
    userId = req.body.userId and String req.body.userId
    params = req.body.params
    overrides[userId] = params

    return overrides


module.exports = new ExperimentCtrl()
