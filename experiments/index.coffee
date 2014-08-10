_ = require 'lodash'
Promise = require 'bluebird'

experiments = [
  require './login_button'
]

module.exports =
  getParams: (userId) ->
    Promise.resolve _.reduce experiments, (params, experiment) ->
      _.defaults params, experiment.assign(userId)
    , {}
