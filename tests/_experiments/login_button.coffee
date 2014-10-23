picker = require 'flak-cannon-picker'

class LoginButtonExperiment
  params: ['login_button']
  assign: (data) ->
    login_button: picker.uniformChoice(data.id, ['red', 'blue', 'green'])


module.exports = new LoginButtonExperiment()
