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
      .expect 200, Joi.object().keys
        views: Joi.array().includes Joi.object().keys
          param: Joi.string()
          count: Joi.number()
        counts: Joi.array().includes(
          Joi.array().includes(
            Joi.object().keys
              date: Joi.string()
              value: Joi.string()
              count: Joi.number()
            )
          )

  it 'supports uniq conversions', ->
    from = new Date()
    from.setDate(from.getDate() - 7)
    to = new Date()
    to.setDate(to.getDate() + 1)

    queryParams = "event=only_one&param=login_button&from=#{from}&to=#{to}"
    flare
      .post '/conversions', {event: 'only_one', uniq: '123', userId: 123}
      .expect 200
      .post '/conversions', {event: 'only_one', uniq: '123', userId: 123}
      .expect 200
      .get "/results?#{queryParams}"
      .expect 200, Joi.object().keys
        views: Joi.array().includes
          param: Joi.string()
          count: Joi.number()
        counts: Joi.array().includes(
          Joi.array().includes
            date: Joi.string(),
            value: Joi.string(),
            count: 1
        )
