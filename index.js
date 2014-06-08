'use strict'
/**
 * Module dependencies.
 */

var responseTime = require('koa-response-time')
var ratelimit = require('koa-ratelimit')
var compress = require('koa-compress')
var logger = require('koa-logger')
var router = require('koa-router')
var redis = require('redis')
var koa = require('koa')
var parse = require('co-body')
var uuid = require('node-uuid')
var Promise = require('bluebird')
var _ = require('lodash')

var Iridium = require('iridium')

var db = new Iridium({
    db: 'flak_cannon'
})

var uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

var User = new Iridium.Model(db, 'user', {
  uuid: uuidRegExp,
  info: Object,
  experiments: Object,
  conversions: Object
})
User.create = Promise.promisify(User.create, User)
User.find = Promise.promisify(User.find, User)
User.findOne = Promise.promisify(User.findOne, User)

var Experiment = new Iridium.Model(db, 'experiment', {
  name: String,
  values: [String]
})

/**
 * Environment.
 */

var env = process.env.NODE_ENV || 'development'

/**
 * Expose `api()`.
 */

module.exports = api

/**
 * Initialize an app with the given `opts`.
 *
 * @param {Object} opts
 * @return {Application}
 * @api public
 */

function api(opts) {
  opts = opts || {}
  var app = koa()

  // logging
  app.use(logger())

  app.use(function *database(next) {
    yield Promise.promisify(db.connect, db)()
    yield next
  })

  // x-response-time
  app.use(responseTime())

  // compression
  app.use(compress())

  // rate limiting
  app.use(ratelimit({
    max: opts.ratelimit,
    duration: opts.duration,
    db: redis.createClient()
  }))

  // routing
  app.use(router(app))

  app.get('/users/:id', function *() {
    var body = yield parse(this)
    this.body = db.User.find({
      id: body.id
    })
  })


  app.post('/users', function *() {
    var user = yield parse(this)
    var uniqId = uuid.v1()
    console.log(uniqId);
    user = _.defaults(user, {
      uuid: uniqId,
      info: {},
      experiments: {},
      conversions: {}
    })

    this.body = (yield User.create(user)).__state.modified
  })

  return app
}
