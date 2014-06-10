/*eslint camel:0*/
'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  id: String,
  group: String,
  info: Object,
  experiments: Object,
  conversions: Object,
  _createdAt: { type: Date, default: Date.now }
})

UserSchema.method('toJSON', function() {
  var user = this.toObject()
  delete user.__v
  delete user._id
  delete user._createdAt
  return user
})

module.exports = mongoose.model('User', UserSchema)
