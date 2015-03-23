Events = require '../lib/events'

mongoose = require 'mongoose'
Schema = mongoose.Schema

DATA_EXPIRE_TIME_SECONDS = 2592000 # 30 days

ConversionSchema = new Schema(
  event: {type: String},
  timestamp: {
    type: Date
    default: Date.now
    index: { expireAfterSeconds: DATA_EXPIRE_TIME_SECONDS }
  },
  userId: String,
  uniq: {type: String, unique: true, sparse: true},
  params: {type: Object}
)

ConversionSchema.index({event: 1, timestamp: 1, params: 1})

 # coffeelint: disable=missing_fat_arrows
ConversionSchema.method 'toJSON', ->
  conversion = this.toObject()
  delete conversion.__v
  delete conversion._id
  return conversion
 # coffeelint: enable=missing_fat_arrows

Conversion = mongoose.model 'Conversion', ConversionSchema

Events.on 'experiments|index|getParams', (event) ->
  Conversion.create
    event: 'view'
    userId: event.userId
    params: event.params
    timestamp: event.timestamp or Date.now()


module.exports = Conversion
