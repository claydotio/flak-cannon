_ = require 'lodash'
Promise = require 'bluebird'
Events = require '../lib/events'

experiments = require './experiment_list'

# Internal usage at clay.io
try
  experiments = require 'clay-flak-cannon-experiments'
catch e
  null

console.log '# Experiments: ', experiments.length

module.exports =
  getParams: (userId, dontEmit) ->
    Promise.resolve _.reduce experiments, (params, experiment) ->
      _.defaults params, experiment.assign(userId)
    , {}
    .then (params) ->
      unless dontEmit
        Events.emit 'experiments|index|getParams',
          userId: userId
          params: params
      return params
  getUsedParams: ->
    Promise.resolve _.flatten _.pluck experiments, 'params'
