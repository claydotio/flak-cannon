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
    data = req.body.data
    uniq = req.body.uniq

    unless event
      return Promise.reject new Error 'event required'

    unless data.id
      return Promise.reject new Error 'id is required in data'

    Experiments.getParams data, true
    .then (params) ->
      if uniq
        Conversion.findOne {uniq}
        .exec().then (conversion) ->
          if conversion
            return null
          else
            log.info 'CONVERSION:', {event, data, params, uniq}
            Conversion.create {event, data, params, uniq}
      else
        log.info 'CONVERSION:', {event, data, params, uniq}
        Conversion.create {event, data, params}


module.exports = new ConversionCtrl()
