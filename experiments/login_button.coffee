pick = require '../lib/pick'

class LoginButtonExperiment
  params: ['login_button']
  assign: (userId) ->
    login_button: pick.uniformChoice(userId, ['red', 'greener', 'blue'])


module.exports = new LoginButtonExperiment()
