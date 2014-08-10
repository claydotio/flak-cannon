Experiments = require '../experiments/index'
Conversion = require '../models/conversion'

class ConversionCtrl
  index: ->
    {hello: 'world'}
  create: (req) ->
    userId = req.params.userId

    Experiments.getParams userId
    .then (params) ->
      Conversion.create
        event: req.params.name
        userId: userId
        app: req.params.app
        params: params



module.exports = new ConversionCtrl()
