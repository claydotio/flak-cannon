_ = require 'lodash'
Promise = require 'bluebird'
express = require 'express'

config = require './config'

router = express.Router()

UserCtrl = require './controllers/user'
ConversionCtrl = require './controllers/conversion'

routes =

  # Users
  'get /users/params': UserCtrl.getParams
  'get /users/:id': UserCtrl.index
  'post /users': UserCtrl.create

  # Conversions
  'post /users/:userId/convert/:name': ConversionCtrl.create
  'get /conversions': ConversionCtrl.index
  'get /conversions/:event': ConversionCtrl.results

_.map routes, (handler, route) ->
  verb = route.split(' ')[0]
  path = route.split(' ')[1]

  router[verb] path, (req, res) ->
    Promise.try(handler, [req])
    .then (result) ->
      res.json result
    .catch (err) ->

      # TODO: use proper logger
      console.log err

      if config.ENV == config.ENVS.DEV
        res.status(500).end err
      res.status(500).end null

module.exports = router
