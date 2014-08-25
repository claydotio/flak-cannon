express = require 'express'
bodyParser = require 'body-parser'
mongoose = require 'mongoose'
cors = require 'cors'

routes = require './routes'
config = require './config'

mongo = config.mongo

mongoose.connect "mongodb://#{mongo.host}:#{mongo.port}/#{mongo.database}"

app = express()

app.use bodyParser.json()
app.use cors(exposedHeaders: 'etag')
app.use routes

module.exports = app
