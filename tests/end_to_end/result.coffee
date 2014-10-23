Flare = require 'flare-gun'
Joi = require 'joi'

app = require '../../'

flare = new Flare().express(app)

describe 'Result Routes', ->
  it 'gets results', ->
    for i in [1..30]
      flare = flare
        .post '/conversions', {event: 'signup', data: id: i}
        .expect 200


    from = new Date()
    from.setDate(from.getDate() - 7)
    to = new Date()
    to.setDate(to.getDate() + 1)

    queryParams = "event=signup&param=login_button&from=#{from}&to=#{to}"
    flare
      .get "/results?#{queryParams}"
      .expect 200, Joi.object().required().keys
        views: Joi.array().required().includes Joi.object().required().keys
          param: Joi.string().required()
          count: Joi.number().required()
        counts: Joi.array().required().includes(
          Joi.array().required().includes(
            Joi.object().required().keys
              date: Joi.string().required()
              value: Joi.string().required()
              count: Joi.number().required()
            )
          )
