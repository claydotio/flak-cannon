Flare = require 'flare-gun'
Joi = require 'joi'

app = require '../../'

flare = new Flare().express(app)

describe 'User Routes', ->
  describe 'create()', ->
    it 'creates user and returns params', ->
      flare
        .post '/users'
        .expect 200,
          id: Joi.string().required()
          params: Joi.object().required().keys
            login_button: Joi.string().required()
        .post '/users', {abc: 123}
        .expect 200,
          id: Joi.string().required()
          params: Joi.object().required().keys
            login_button: Joi.string().required()
          meta:
            abc: 123

    it 'returns the user if already exists with meta id', ->
      flare
        .post '/users', {id: 123, abc: 321}
        .expect 200,
          id: Joi.string().required()
          params: Joi.object()
          meta:
            id: 123
        .stash 'jim'
        .post '/users', id: 123
        .expect 200,
          id: Joi.string().required()
          params: Joi.object()
          meta:
            id: 123
            abc: 321

  it 'gets users', ->
    flare
      .post '/users'
      .expect 200
      .stash 'jam'
      .get '/users/:jam.id'
      .expect 200,
        id: Joi.string().required()
        meta: Joi.object()
        params: Joi.object().required().keys
          login_button: Joi.string().required().regex(/^(red|green|blue)$/)

  it 'gets params', ->
    flare
      .get '/users/params'
      .expect 200, Joi.array().includes
        id: Joi.string().required()
