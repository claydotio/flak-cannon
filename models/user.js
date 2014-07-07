/*eslint camel:0*/
'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  id: String,
  namespace: String,
  group: String,
  clientId: String,
  info: Object,
  experiments: Object
})

UserSchema.method('toJSON', function() {
  var user = this.toObject()
  delete user.__v
  delete user._id
  return user
})

module.exports = mongoose.model('User', UserSchema)
