express = require 'express'
bodyParser = require 'body-parser'
routes = require './routes'

app = express()

app.use bodyParser.json()
app.use routes

server = app.listen 3000, ->
  console.log 'Listening on port %d', server.address().port
