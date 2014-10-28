Promise = require 'bluebird'
_ = require 'lodash'

Conversion = require '../models/conversion'
RedisService = require '../services/redis'

TWO_SECONDS_MS = 1000 * 2

class HealthCtrl
  check: ->
    Promise.settle([
      Promise.cast(Conversion.findOne().exec()).timeout TWO_SECONDS_MS
    ]).spread (conversion) ->
      result =
        ConversionModel: conversion.isFulfilled()
        Redis: RedisService.connected

      result.healthy = _.every _.values result
      return result

module.exports = new HealthCtrl()
