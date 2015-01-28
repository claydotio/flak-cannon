Flare = require 'flare-gun'
Joi = require 'joi'

app = require '../../'
config = require 'config'

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

  it 'errors on bot conversions', ->
    flare
      .post '/conversions', {event: 'signup', userId: config.CRAWLER_USER_ID}
      .expect 500

  it 'gets conversions', ->
    flare
      .get '/conversions'
      .expect 200, Joi.array().includes
        id: Joi.string()

  it 'converts with timestamp for testing', ->
    time = Date.now()
    flare
      .post '/conversions', {event: 'signup', userId: 123, timestamp: time}
      .expect 200,
        event: 'signup'
        userId: '123'
        timestamp: Joi.string().valid(new Date(time).toISOString())
        params: Joi.object().keys
          login_button: Joi.string()
