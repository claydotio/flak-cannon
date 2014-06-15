'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ExperimentSchema = new Schema({
  name: String,
  values: Array
})

ExperimentSchema.method('toJSON', function() {
  var experiment = this.toObject()
  delete experiment.__v
  delete experiment._id
  return experiment
})

module.exports = mongoose.model('Experiment', ExperimentSchema)
