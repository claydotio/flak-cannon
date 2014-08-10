_ = require 'lodash'
Promise = require 'bluebird'
express = require 'express'

config = require './config'

router = express.Router()

UserCtrl = require './controllers/user'
ConversionCtrl = require './controllers/conversion'

routes =

  # Users
  'get /users': UserCtrl.index
  'get /users/:id': UserCtrl.index
  'post /users': UserCtrl.create
  'post /users/:id/app/:app/convert/:name': UserCtrl.convert

  # Conversions
  'get /:app/conversions/:name': ConversionCtrl.index

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

      if config.env == config.envs.DEV
        res.status(500).end err
      res.status(500).end null

module.exports = router
