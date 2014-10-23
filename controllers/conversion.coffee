_ = require 'lodash'
Promise = require 'bluebird'

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

    unless event
      return Promise.reject new Error 'event required'

    unless data.id
      return Promise.reject new Error 'id is required in data'

    Experiments.getParams data, true
    .then (params) ->
      Conversion.create {event, data, params}


module.exports = new ConversionCtrl()
