express = require 'express'
bodyParser = require 'body-parser'
mongoose = require 'mongoose'
cors = require 'cors'
morgan = require 'morgan'

routes = require './routes'
config = require './config'

mongo = config.mongo

mongoose.connect "mongodb://#{mongo.host}:#{mongo.port}/#{mongo.database}"

app = express()

if config.env isnt config.envs.TEST
  app.use morgan 'combined'
app.use bodyParser.json()
app.use cors(exposedHeaders: 'etag')
app.use routes

module.exports = app
