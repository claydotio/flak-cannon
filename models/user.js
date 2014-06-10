'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  id: String,
  info: Object,
  experiments: Object,
  conversions: Object
})

UserSchema.method('toJSON', function() {
  var user = this.toObject()
  delete user.__v
  delete user._id
  return user
})

module.exports = mongoose.model('User', UserSchema)
