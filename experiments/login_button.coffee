pick = require '../lib/pick'

class LoginButtonExperiment
  app: 'testapp'
  assign: (userId) ->
    login_button: pick.uniformChoice(userId, ['red', 'green', 'blue'])

    
module.exports = new LoginButtonExperiment()
