express = require 'express'
bodyParser = require 'body-parser'
routes = require './routes'

config = require './config'

app = express()

app.use bodyParser.json()
app.use routes

module.exports = app
