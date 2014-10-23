Flare = require 'flare-gun'
Joi = require 'joi'

app = require '../../'

flare = new Flare().express(app)

describe 'Conversion Routes', ->
  it 'converts', ->
    flare
      .post '/conversions', {event: 'signup', data: id: 123}
      .expect 200,
        event: 'signup'
        data:
          id: 123
        timestamp: Joi.string().required()
        params: Joi.object().required().keys
          login_button: Joi.string().required()

  it 'gets conversions', ->
    flare
      .get '/conversions'
      .expect 200, Joi.array().includes
        id: Joi.string().required()
