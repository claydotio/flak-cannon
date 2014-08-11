Flare = require 'flare-gun'
Joi = require 'joi'

app = require '../../'

flare = new Flare().express(app)

describe 'Conversion Routes', ->
  it 'converts users', ->
    flare
      .post '/users'
      .expect 200
      .stash 'jed'
      .post '/users/:jed.id/convert/signup'
      .expect 200,
        event: 'signup'
        userId: ':jed.id'
        timestamp: Joi.date().required()
        params: Joi.object().required().keys
          login_button: Joi.string().required()

  it 'gets conversions', ->
    flare
      .get '/conversions'
      .expect 200, Joi.array().includes
        id: Joi.string().required()

  it 'gets results', ->
    from = new Date()
    from.setDate(from.getDate() - 7)
    to = new Date()
    to.setDate(to.getDate() + 1)

    queryParams = "param=login_button&from=#{from}&to=#{to}"

    for i in [0..30]
      flare = flare
        .post '/users'
        .expect 200
        .stash "jed#{i}"
        .post "/users/:jed#{i}.id/convert/messageAction"
        .expect 200

    flare
      .get "/conversions/messageAction?#{queryParams}"
      .expect 200, Joi.object().required().keys
        views: Joi.array().required().includes Joi.object().required().keys
          param: Joi.string().required()
          count: Joi.number().required()
        counts: Joi.array().required().includes(
          Joi.array().required().includes(
            Joi.object().required().keys
              date: Joi.date().required()
              value: Joi.string().required()
              count: Joi.number().required()
            )
          )
