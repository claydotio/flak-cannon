express = require 'express'
bodyParser = require 'body-parser'
mongoose = require 'mongoose'
cors = require 'cors'
morgan = require 'morgan'

routes = require './routes'
config = require './config'

mongoDatabase = 'flak_cannon_test'
mongoHost = 'localhost'
mongoPort = 27017

mongoose.connect "mongodb://#{mongoHost}:#{mongoPort}/#{mongoDatabase}"

app = express()

if config.env isnt config.envs.TEST
  app.use morgan 'combined'
app.use bodyParser.json()
app.use cors(exposedHeaders: 'etag')
app.use routes

module.exports = app
