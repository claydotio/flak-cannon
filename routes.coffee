_ = require 'lodash'
Promise = require 'bluebird'
express = require 'express'
log = require 'loglevel'

config = require './config'

router = express.Router()

ConversionCtrl = require './controllers/conversion'
ExperimentCtrl = require './controllers/experiment'
ResultCtrl = require './controllers/result'
HealthCtrl = require './controllers/health'

routes =
  'get /healthcheck': HealthCtrl.check

  'post /experiments': ExperimentCtrl.assign
  'get /experiments': ExperimentCtrl.index

  'post /conversions': ConversionCtrl.create
  'get /conversions': ConversionCtrl.index

  'get /results': ResultCtrl.index

_.map routes, (handler, route) ->
  verb = route.split(' ')[0]
  path = route.split(' ')[1]

  router[verb] path, (req, res) ->
    Promise.try(handler, [req])
    .then (result) ->
      res.json result
    .catch (err) ->
      log.trace err

      res.status(500).end null

module.exports = router
