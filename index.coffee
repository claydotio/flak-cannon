express = require 'express'
bodyParser = require 'body-parser'
mongoose = require 'mongoose'

routes = require './routes'
config = require './config'

mongoDatabase = 'flak_cannon_test'
mongoHost = 'localhost'
mongoPort = 27017

mongoose.connect "mongodb://#{mongoHost}:#{mongoPort}/#{mongoDatabase}"

app = express()

app.use bodyParser.json()
app.use routes

module.exports = app
