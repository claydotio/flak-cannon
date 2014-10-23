_ = require 'lodash'
Promise = require 'bluebird'
log = require 'loglevel'

Events = require '../lib/events'
experiments = require './experiment_list'
config = require '../config'

# Internal usage at clay.io
unless config.ENV is config.ENVS.TEST
  try
    experiments = require 'clay-flak-cannon-experiments'
  catch e
    null

log.info '# Experiments: ', experiments.length

module.exports =
  getParams: (data, dontEmit) ->
    Promise.resolve _.reduce experiments, (params, experiment) ->
      _.defaults params, experiment.assign(data)
    , {}
    .then (params) ->
      unless dontEmit
        Events.emit 'experiments|index|getParams', {params, data}
      return params
  getUsedParams: ->
    Promise.resolve _.flatten _.pluck experiments, 'params'
