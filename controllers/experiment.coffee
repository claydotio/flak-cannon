_ = require 'lodash'
Promise = require 'bluebird'

Experiments = require '../experiments'

class ExperimentCtrl
  assign: (req) ->
    userId = req.body.userId
    userId ?= req.body.id # LEGACY
    fromUserId = req.body.fromUserId

    if fromUserId
      Experiments.createUserIdMapping userId, fromUserId
      .then ->
        Experiments.getParams userId
    else
      Experiments.getParams userId

  index: ->
    Experiments.getUsedParams().then (params) ->
      _.map params, (param) ->
        id: param

module.exports = new ExperimentCtrl()
