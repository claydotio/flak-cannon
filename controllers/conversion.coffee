_ = require 'lodash'
Promise = require 'bluebird'
log = require 'loglevel'

Experiments = require '../experiments/index'
Conversion = require '../models/conversion'

class ConversionCtrl
  index: ->
    Conversion.distinct('event').exec()
    .then (conversions) ->
      _.map conversions, (conversion) ->
        id: conversion

  create: (req) ->
    event = req.body.event
    userId = req.body.userId
    userId ?= req.body.data?.id # LEGACY
    uniq = req.body.uniq

    unless event
      return Promise.reject new Error 'event required'

    unless userId
      return Promise.reject new Error 'userId is required'

    Experiments.getParams userId, true
    .then (params) ->
      if uniq
        Conversion.findOne {uniq}
        .exec().then (conversion) ->
          if conversion
            return null
          else
            log.info 'CONVERSION:', {event, userId, params, uniq}
            Conversion.create {event, userId, params, uniq}
      else
        log.info 'CONVERSION:', {event, userId, params, uniq}
        Conversion.create {event, userId, params}


module.exports = new ConversionCtrl()
