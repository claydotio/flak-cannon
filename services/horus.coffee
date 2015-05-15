fs = require 'fs'
log = require 'loglevel'
_ = require 'lodash'

config = require '../config'

SEPARATOR = '.'
# Dataset name must only contain [a-z0-9]+
CONVERSIONS_FILE = "#{config.LOG_DIR}/flak7cannon7conversions_horus.tsv"

# NOTE: These cannnot be changed. Create a new log file instead
CONVERSION_COLUMNS = [
  { key: 'event', name: 'event' }
  { key: 'userId', name: 'user_id' }
  { key: 'params', name: 'params+' }
  { key: 'uniq', name: 'uniq' }
  { key: 'ip', name: 'ip' }
  { key: 'namespace', name: 'namespace' }
  { key: 'meta', name: 'meta+' }
]

getColumns = ->
  _.pluck CONVERSION_COLUMNS, 'name'
  .join '\t'

flattenObject = (obj, prefix = '') ->
  _.reduce obj, (result, val, key) ->
    if _.isPlainObject val
      result.concat flattenObject val, prefix + key + SEPARATOR
    else
      if _.contains val, ' '
        throw new Error 'Spaces not allowed in values'
      result.concat prefix + key + '=' + val
  , []

conversionToTSV = (conversion) ->
  _.map CONVERSION_COLUMNS, ({key}) ->
    value = conversion[key]
    unless value
      return '-'

    switch key
      when 'params'
        flattenObject(value).join ' '
      when 'meta'
        flattenObject(value).join ' '
      else
        if _.contains value, ' '
          throw new Error 'Spaces not allowed in values'
        value
  .join '\t'

class HorusService
  constructor: ->
    try
      fs.statSync CONVERSIONS_FILE
    catch
      fs.writeFileSync CONVERSIONS_FILE, "#{getColumns()}\n"

    @conversionStream = fs.createWriteStream CONVERSIONS_FILE, flags: 'a'
    @conversionStream.on 'error', log.trace

    process.on 'exit', =>
      @conversionStream.end()

  convert: (conversion) =>
    @conversionStream.write conversionToTSV(conversion) + '\n'


module.exports = new HorusService()
