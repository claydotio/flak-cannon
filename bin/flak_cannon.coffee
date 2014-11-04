#!/usr/bin/env coffee

log = require 'loglevel'

app = require '../'
config = require '../config'

log.enableAll()

server = app.listen config.PORT, ->
  log.info 'Listening on port %d', server.address().port
