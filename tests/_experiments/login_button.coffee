picker = require 'flak-cannon-picker'

class LoginButtonExperiment
  params: ['login_button']
  assign: (userId) ->
    login_button: picker.uniformChoice(userId, ['red', 'blue', 'green'])


module.exports = new LoginButtonExperiment()
