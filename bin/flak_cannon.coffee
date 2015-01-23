#!/usr/bin/env coffee

log = require 'loglevel'

app = require '../'
config = require '../config'

server = app.listen config.PORT, ->
  log.info 'Listening on port %d', server.address().port
