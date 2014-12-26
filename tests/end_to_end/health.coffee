Flare = require 'flare-gun'
Joi = require 'joi'

app = require '../../'

flare = new Flare().express(app)

describe 'health Check', ->
  it 'is healthy', ->
    flare
      .get '/healthcheck'
      .expect 200,
        Mongoose: true
        Redis: true
        healthy: true

  it 'pongs', ->
    flare
      .get '/ping'
      .expect 200, 'pong'
