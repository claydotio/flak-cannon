mongoose = require 'mongoose'
Schema = mongoose.Schema

ConversionSchema = new Schema(
  event: String,
  app: String,
  timestamp: { type: Date, default: Date.now },
  userId: String,
  params: Object
)

ConversionSchema.method 'toJSON', ->
  conversion = this.toObject()
  delete conversion.__v
  delete conversion._id
  return conversion

module.exports = mongoose.model 'Conversion', ConversionSchema
