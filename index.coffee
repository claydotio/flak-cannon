express = require 'express'
bodyParser = require 'body-parser'
mongoose = require 'mongoose'
cors = require 'cors'

routes = require './routes'
config = require './config'

mongo = config.MONGO

mongoose.connect "mongodb://#{mongo.host}:#{mongo.port}/#{mongo.database}"
mongoose.connection.on 'error', console.error
mongoose.connection.once 'open', -> console.log 'Connected to mongoDB'

app = express()

app.use bodyParser.json()
app.use cors(exposedHeaders: 'etag')
app.use routes

module.exports = app
