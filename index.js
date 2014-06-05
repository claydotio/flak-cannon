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

var ZSchema = require('z-schema')

ZSchema.setRemoteReference('#/info', JSON.stringify({
  type: 'object'
}))

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

  if (env !== 'test') {
    app.use(logger())
  }

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

  app.post('/users', function *() {
    var user = yield parse(this)

    // validate
    yield ZSchema.validate(user, {
      type: 'object',
      definitions: {
        info: {
          type: 'object'
        }
      },
      properties: {
        info: {
          $ref: '#/definitions/info'
        }
      }
    })
    console.log(user)

    this.body = user
  })

  return app
}
