mongoose = require 'mongoose'
Schema = mongoose.Schema

UserSchema = new Schema({
  id: String,
  meta: Object
})

UserSchema.method 'toJSON', ->
  user = this.toObject()
  delete user.__v
  delete user._id
  return user

module.exports = mongoose.model 'User', UserSchema
