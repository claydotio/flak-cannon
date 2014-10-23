Events = require '../lib/events'

mongoose = require 'mongoose'
Schema = mongoose.Schema

ConversionSchema = new Schema(
  event: String,
  timestamp: { type: Date, default: Date.now },
  data: Object,
  uniq: String,
  params: Object
)

ConversionSchema.method 'toJSON', ->
  conversion = this.toObject()
  delete conversion.__v
  delete conversion._id
  return conversion

Conversion = mongoose.model 'Conversion', ConversionSchema

Events.on 'experiments|index|getParams', (event) ->
  Conversion.create
    event: 'view'
    data: event.data
    params: event.params

module.exports = Conversion
