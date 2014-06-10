'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ExperimentSchema = new Schema({
  name: String,
  values: Array
})

ExperimentSchema.method('toJSON', function() {
  var user = this.toObject()
  delete user.__v
  delete user._id
  return user
})

module.exports = mongoose.model('Experiment', ExperimentSchema)
