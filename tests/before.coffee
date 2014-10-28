Promise = require 'bluebird'
path = require 'path'

Conversion = require 'models/conversion'
RedisService = require 'services/redis'


###
  Override Experiments
###

# Test experiments
experiments = require './_experiments/experiment_list'

# Load the original into cache
fullExperimentsPath = __dirname + '/../experiments/experiment_list.coffee'
fullExperimentsPath = path.normalize(fullExperimentsPath)
orig = require fullExperimentsPath

# Override the cache
require.cache[fullExperimentsPath].exports = experiments


before ->
  Promise.all [
    Conversion.remove().exec()
    RedisService.flushdbAsync()
  ]
