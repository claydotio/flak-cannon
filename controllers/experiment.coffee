_ = require 'lodash'
Promise = require 'bluebird'

Experiments = require '../experiments'

class ExperimentCtrl
  assign: (req) ->
    Experiments.getParams req.body

  index: ->
    Experiments.getUsedParams().then (params) ->
      _.map params, (param) ->
        id: param

module.exports = new ExperimentCtrl()
