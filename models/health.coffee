class HealthState
  constructor: ->
    @errors = []

  addError: (err) ->
    @errors.push err

  getErrors: ->
    unless @errors.length
      return null

    @errors

module.exports = new HealthState()
