'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ConversionSchema = new Schema({
  name: String,
  timestamp: { type: Date, default: Date.now },
  userId: String,
  experiments: Object
})

ConversionSchema.method('toJSON', function() {
  var conversion = this.toObject()
  delete conversion.__v
  delete conversion._id
  return conversion
})

module.exports = mongoose.model('Conversion', ConversionSchema)
