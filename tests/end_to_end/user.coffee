should = require('clay-chai').should()
Flare = require 'flare-gun'
Joi = require 'joi'

app = require '../../'

flare = new Flare().express(app)

describe 'User Controller', ->
  describe 'create()', ->
    it 'creates user and returns params', ->
      flare
        .post '/users'
        .expect 200,
          id: Joi.string().required()
          params: Joi.object().keys
            login_button: Joi.string().required()
        .post '/users', {abc: 123}
        .expect 200,
          id: Joi.string().required()
          params: Joi.object().keys
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
        params: Joi.object().keys
          login_button: Joi.string().required()

  it 'converts', ->
    flare
      .post '/users'
      .expect 200
      .stash 'jed'
      .post '/users/:jed.id/app/testapp/convert/signup'
      .expect 200,
        event: 'signup'
        userId: ':jed.id'
        timestamp: Joi.date().required()
        app: 'testapp'
        params: Joi.object().keys
          login_button: Joi.string().required()
  return
  it 'gets results', ->
    from = new Date()
    from.setDate(from.getDate() - 7)
    to = new Date()
    to.setDate(to.getDate() + 1)

    queryParams = "params=login_button&from=#{from}&to=#{to}"

    flare
      .post '/users'
      .expect 200
      .stash 'jed'
      .post '/users/:jed.id/app/testapp/convert/messageAction'
      .expect 200
      .get "/testapp/conversions/messageAction?#{queryParams}"
      .expect 200,
        Joi.array().includes
          Joi.object().keys
            date: Joi.date().required()
            data: Joi.array().required()
              .includes Joi.object().keys
                name: Joi.string().required()
                count: Joi.number().required()
                views: Joi.number().required()
