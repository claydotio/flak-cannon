Chance = require 'chance'

class Pick
  uuidToNumber: (uuid) ->
    maxInt = Math.pow(2, 53) - 1
    hexLength = maxInt.toString(16).length

    hex = uuid.replace(/-/g, '').slice 0, hexLength - 1
    return parseInt hex, 16

  uniformChoice: (seed, choices) =>
    chance = new Chance(@uuidToNumber seed)
    choices[chance.integer {min: 0, max: choices.length - 1}]



module.exports = new Pick()
