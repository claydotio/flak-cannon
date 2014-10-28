Events = require '../lib/events'

mongoose = require 'mongoose'
Schema = mongoose.Schema

ConversionSchema = new Schema(
  event: String,
  timestamp: { type: Date, default: Date.now },
  userId: String,
  uniq: String,
  params: Object
)

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

module.exports = Conversion
