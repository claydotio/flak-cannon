Chance = require 'chance'

module.exports =
  uniformChoice: (seed, choices) ->
    chance = new Chance(seed)
    choices[chance.integer {min: 0, max: choices.length - 1}]
