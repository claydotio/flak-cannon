_ = require 'lodash'
Promise = require 'bluebird'
log = require 'loglevel'
moment = require 'moment'
Joi = require 'joi'

Experiments = require '../experiments/index'
Conversion = require '../models/conversion'
HorusService = require '../services/horus'
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
    userId = req.body.userId and String req.body.userId
    isBot = userId is config.CRAWLER_USER_ID
    ip = req.headers['x-forwarded-for'] or req.connection.remoteAddress
    meta = req.body.meta
    namespace = req.body.namespace
    uniq = req.body.uniq

    unless userId # LEGACY
      userId = String req.body.data?.id

    timestamp = if config.ENV is config.ENVS.PROD \
      then Date.now()
      else req.body.timestamp or Date.now()

    valid = Joi.validate {event, userId, isBot, ip},
      event: Joi.string()
      userId: Joi.string()
      isBot: Joi.boolean().valid(false)
      ip: Joi.string()
    , {presence: 'required'}

    if valid.error
      return Promise.reject new Error valid.error.message

    optional = Joi.validate {uniq, namespace, meta},
      uniq: Joi.string()
      namespace: Joi.string()
      meta: Joi.object()

    if optional.error
      return Promise.reject new Error optional.error.message

    Experiments.getParams userId
    .then ([params, isOrganic]) ->
      conversion = {event, userId, params, uniq, timestamp, ip, namespace, meta}
      if uniq
        Conversion.findOne {uniq}
        .exec().then (duplicate) ->
          if duplicate
            return null
          else
            log.info 'CONVERSION:', conversion
            HorusService.convert conversion
            Conversion.create conversion
      else
        log.info 'CONVERSION:', conversion
        HorusService.convert conversion
        Conversion.create conversion


module.exports = new ConversionCtrl()
