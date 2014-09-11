Promise = require 'bluebird'
_ = require 'lodash'

Conversion = require '../models/conversion'
User = require '../models/user'

class HealthCtrl
  check: ->
    Promise.settle([
      Conversion.findOne().exec()
      User.findOne().exec()
    ]).spread (conversion, user) ->
      result =
        ConversionModel: conversion.isFulfilled()
        UserModel: user.isFulfilled()

      result.healthy = _.every _.values result
      return result

module.exports = new HealthCtrl()
