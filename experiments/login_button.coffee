pick = require '../lib/pick'

class LoginButtonExperiment
  assign: (userId) ->
    login_button: pick.uniformChoice(userId, ['red', 'greener', 'blue'])


module.exports = new LoginButtonExperiment()
