Promise = require 'bluebird'

Conversion = require 'models/conversion'
User = require 'models/user'

before (done) ->
  Promise.all [
    Conversion.remove().exec()
    User.remove().exec()
  ]
  .nodeify done
