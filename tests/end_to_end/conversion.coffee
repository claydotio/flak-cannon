Flare = require 'flare-gun'
Joi = require 'joi'

app = require '../../'

flare = new Flare().express(app)

describe 'Conversion Routes', ->
  it '[legacy] converts', ->
    flare
      .post '/conversions', {event: 'signup', data: id: 123}
      .expect 200,
        event: 'signup'
        userId: '123'
        timestamp: Joi.string()
        params: Joi.object().keys
          login_button: Joi.string()

  it 'converts', ->
    flare
      .post '/conversions', {event: 'signup', userId: 123}
      .expect 200,
        event: 'signup'
        userId: '123'
        timestamp: Joi.string()
        params: Joi.object().keys
          login_button: Joi.string()

  it 'gets conversions', ->
    flare
      .get '/conversions'
      .expect 200, Joi.array().includes
        id: Joi.string()
