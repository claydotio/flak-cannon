Flare = require 'flare-gun'
Joi = require 'joi'

app = require '../../'
config = require 'config'
Conversion = require '../../models/conversion'
RedisService = require '../../services/redis'

flare = new Flare().express(app)

describe 'Result Routes', ->
  it 'gets results', ->
    for i in [1..30]
      flare = flare
        .post '/conversions', {event: 'event_name', userId: i}
        .expect 200


    from = new Date()
    from.setDate(from.getDate() - 7)
    to = new Date()
    to.setDate(to.getDate() + 1)

    queryParams = "event=event_name&param=login_button&from=#{from}&to=#{to}"
    flare
      .get "/results?#{queryParams}"
      .expect 200, Joi.object().keys
        views: Joi.array()
        counts: Joi.array().items(
          Joi.array().items(
            Joi.object().keys
              date: Joi.string()
              value: Joi.string()
              count: Joi.number()
            )
          )

  describe 'wildcard param', ->
    before ->
      Conversion.remove().exec()

    it 'supports * as wildcard param', ->
      for i in [1..30]
        flare = flare
          .post '/conversions', {event: 'signup', userId: i}
          .expect 200

      from = new Date()
      from.setDate(from.getDate() - 7)
      to = new Date()
      to.setDate(to.getDate() + 1)

      queryParams = "event=signup&param=*&from=#{from}&to=#{to}"
      flare
        .get "/results?#{queryParams}"
        .expect 200, Joi.object().keys
          views: Joi.array().items Joi.object().keys
            param: Joi.string()
            count: Joi.number()
          counts: Joi.array().length(1).items(
            Joi.array().length(1).items(
              Joi.object().keys
                date: Joi.string()
                count: Joi.number().valid(30)
              )
            )
        .post '/conversions', {event: 'signup', userId: 123}
        .expect 200
        .get "/results?#{queryParams}"
        .expect 200, Joi.object().keys
          views: Joi.array().items Joi.object().keys
            param: Joi.string()
            count: Joi.number()
          counts: Joi.array().length(1).items(
            Joi.array().length(1).items(
              Joi.object().keys
                date: Joi.string()
                count: Joi.number().valid(31)
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
        views: Joi.array()
        counts: Joi.array().items(
          Joi.array().items
            date: Joi.string()
            value: Joi.string()
            count: 1
        )

  describe 'supports custom d7 view counter', ->
    before ->
      Conversion.remove().exec()

    it 'counts' , ->
      from = new Date()
      from.setDate(from.getDate() - 7)
      to = new Date()
      to.setDate(to.getDate() + 1)

      queryParams = "event=d7&param=login_button&from=#{from}&to=#{to}" +
                    '&viewCounter=d7'

      # 2 people (1 per param) converted D7
      # there were 4 people who signed up 10 days ago (2 that converted D7)
      timestamp = new Date() # 10 days ago
      timestamp.setDate(timestamp.getDate() - 10)
      flare
        .post '/conversions', {event: 'signup', userId: 1, timestamp}
        .expect 200
        .post '/conversions', {event: 'signup', userId: 1, timestamp}
        .expect 200
        .post '/conversions', {event: 'signup', userId: 2, timestamp}
        .expect 200
        .post '/conversions', {event: 'signup', userId: 2, timestamp}
        .expect 200
        .post '/conversions', {event: 'signup', userId: 2, timestamp}
        .expect 200
        .post '/conversions', {event: 'signup', userId: 2, timestamp}
        .expect 200
        .post '/conversions', {event: 'signup', userId: 2, from}
        .expect 200
        .post '/conversions', {event: 'd7', userId: 1}
        .expect 200
        .post '/conversions', {event: 'd7', userId: 2}
        .expect 200
        .get "/results?#{queryParams}"
        .expect 200, Joi.object().keys
          views: Joi.array().min(2).items
            param: Joi.string()
            count: Joi.number().valid(2, 4)
          counts: Joi.array().items(
            Joi.array().items
              date: Joi.string()
              value: Joi.string()
              count: Joi.number()
          )

  describe 'supports custom dau view counter', ->
    before ->
      Conversion.remove().exec()

    it 'counts', ->
      from = new Date()
      from.setDate(from.getDate() - 7)
      to = new Date()
      to.setDate(to.getDate() + 1)

      queryParams = "event=engaged_gameplay&param=login_button&from=#{from}" +
                    "&to=#{to}&viewCounter=dau"

      yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      flare
        .post '/experiments', {id: 123, timestamp: yesterday}
        .expect 200
        .post '/experiments', {id: 123}
        .expect 200
        .post '/experiments', {id: 123}
        .expect 200
        .post '/experiments', {id: 124, timestamp: yesterday}
        .expect 200
        .post '/experiments', {id: 124}
        .expect 200
        .post '/conversions', {event: 'engaged_gameplay', userId: 123}
        .expect 200
        .get "/results?#{queryParams}"
        .expect 200, Joi.object().keys
          views: Joi.array().min(2).items
            param: Joi.string()
            count: Joi.number().valid(2)
          counts: Joi.array().items(
            Joi.array().items
              date: Joi.string()
              value: Joi.string()
              count: Joi.number()
          )

  describe 'supports custom assignments view counter', ->
    before ->
      Conversion.remove().exec()

    it 'counts', ->
      from = new Date()
      from.setDate(from.getDate() - 7)
      to = new Date()
      to.setDate(to.getDate() + 1)

      queryParams = "event=engaged_gameplay&param=login_button&from=#{from}" +
                    "&to=#{to}&viewCounter=assigned"

      yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      flare
        .post '/experiments', {userId: 123}
        .expect 200
        .post '/experiments', {userId: 129}
        .expect 200
        .post '/experiments', {userId: 132}
        .expect 200
        .post '/experiments', {userId: 133, fromUserId: 123}
        .expect 200
        .post '/conversions', {event: 'engaged_gameplay', userId: 123}
        .expect 200
        .get "/results?#{queryParams}"
        .expect 200, Joi.object().keys
          views: Joi.array().min(1).items
            param: Joi.string()
            count: Joi.number().valid(3)
          counts: Joi.array().items(
            Joi.array().items
              date: Joi.string()
              value: Joi.string()
              count: Joi.number()
          )

  describe 'does not count bots as views', ->
    before ->
      Conversion.remove().exec()
      .then ->
        RedisService.flushdbAsync()

    it 'doesnt count', ->
      from = new Date()
      from.setDate(from.getDate() - 7)
      to = new Date()
      to.setDate(to.getDate() + 1)

      queryParams = "event=engaged_gameplay&param=login_button&from=#{from}" +
                    "&to=#{to}&viewCounter=assigned"

      yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      flare
        .post '/experiments', {userId: 123}
        .expect 200
        .post '/experiments', {userId: 129}
        .expect 200
        .post '/experiments', {userId: config.CRAWLER_USER_ID}
        .expect 200
        .post '/conversions', {event: 'engaged_gameplay', userId: 123}
        .expect 200
        .get "/results?#{queryParams}"
        .expect 200, Joi.object().keys
          views: Joi.array().length(1).items
            param: Joi.string()
            count: Joi.number().valid(2)
          counts: Joi.array().items(
            Joi.array().items
              date: Joi.string()
              value: Joi.string()
              count: Joi.number()
          )
