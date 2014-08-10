#!/usr/bin/env coffee

app = require '../'
config = require '../config'

server = app.listen config.port, ->
  console.log 'Listening on port %d', server.address().port
