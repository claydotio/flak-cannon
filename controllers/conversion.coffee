_ = require 'lodash'
Promise = require 'bluebird'
log = require 'loglevel'
moment = require 'moment'

Experiments = require '../experiments/index'
Conversion = require '../models/conversion'
config = require '../config'

class ConversionCtrl
  index: ->
    # FIXME: this should be fast without timestamp checks.
    #        upgrading to Mongodb v2.6 may fix this
    Conversion.distinct 'event', {
      event: {$ne: 'view'}
      timestamp:
        $gte: new Date(moment().subtract 2, 'days')
    }
    .exec()
    .then (conversions) ->
      _.map conversions, (conversion) ->
        id: conversion

  create: (req) ->
    event = req.body.event
    userId = req.body.userId
    userId ?= req.body.data?.id # LEGACY
    uniq = req.body.uniq
    timestamp = if config.ENV is config.ENVS.PROD \
      then Date.now()
      else req.body.timestamp or Date.now()

    unless event
      return Promise.reject new Error 'event required'

    unless userId
      return Promise.reject new Error 'userId is required'

    Experiments.getParams userId
    .then (params) ->
      conversion = {event, userId, params, uniq, timestamp}
      if uniq
        Conversion.findOne {uniq}
        .exec().then (duplicate) ->
          if duplicate
            return null
          else
            log.info 'CONVERSION:', conversion
            Conversion.create conversion
      else
        log.info 'CONVERSION:', conversion
        Conversion.create conversion


module.exports = new ConversionCtrl()
