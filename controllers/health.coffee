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
        ConversionModel: not (conversion.value() instanceof Error)
        UserModel: not (user.value() instanceof Error)

      result.healthy = _.every _.values result
      return result

module.exports = new HealthCtrl()
