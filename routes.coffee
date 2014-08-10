_ = require 'lodash'
Promise = require 'bluebird'
express = require 'express'

config = require './config'

router = express.Router()

UserCtrl = require './controllers/user'
ConversionCtrl = require './controllers/conversion'

routes =

  # Users
  'get /users/:id': UserCtrl.index
  'post /users': UserCtrl.create

  # Conversions
  'post /users/:userId/app/:app/convert/:name': ConversionCtrl.create
  'get conversions/:name/app/:app': ConversionCtrl.index

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
