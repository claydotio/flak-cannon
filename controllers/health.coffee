Health = require '../models/health'

class HealthCtrl
  state: ->
    if Health.getErrors()
      throw new Error('unhealthy')

    return 'healthy'

module.exports = new HealthCtrl()
