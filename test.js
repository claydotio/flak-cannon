/*globals describe, it*/
'use strict'

var app = require('./')
var flare = require('flare-gun').route('http://localhost:3001/api')
var Joi = require('joi')
var _ = require('lodash')
var uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

app.listen(3001)

var userSchema = {
  id: Joi.string().regex(uuidRegExp).required(),
  info: Joi.object(),
  experiments: Joi.object(),
  convertions: Joi.object()
}

var experimentSchema = {
  name: Joi.string(),
  values: Joi.array().includes(Joi.string())
}

flare = flare.put('/_tests/reset')

describe('Flak Cannon', function(){
  describe('User', function () {
    it('Creates', function(){
      return flare
        .post('/users', {})
        .expect(200, userSchema)
    })

    it('Creates with info', function () {
      return flare
        .post('/users', {
          info: {
            abc: 'def'
          }
        })
        .expect(200, _.defaults({
          info: {
            abc: 'def'
          }
        }, userSchema))
    })

    it('Gets users', function () {
      return flare
        .post('/users', {
          info: {
            id: '123',
            abc: 'def'
          }
        })
        .stash('joe')
        .get('/users/:joe.id')
        .expect(200, _.defaults({
          info: {
            id: '123',
            abc: 'def'
          }
        }, userSchema))
    })

    it('Converts actions', function () {
      return flare
        .post('/users', {
          info: {
            id: '123',
            abc: 'def'
          }
        })
        .stash('joe')
        .put('/users/:joe.id/convert/testing')
        .expect(200, _.defaults({
          conversions: {
            testing: 1
          }
        }, userSchema))
    })
  })

  describe('Experiment', function () {
    it('Creates', function () {
      return flare
        .post('/experiments', {
          name: 'expTest',
          values: ['red', 'green', 'blue']
        })
        .expect(200, _.defaults({
          name: 'expTest',
          values: Joi.array().includes(Joi.string())
        }, experimentSchema))
    })

    it('Gets new users', function () {
      return flare
        .post('/users', {})
        .stash('joe')
        .expect(200, _.defaults({
          experiments: {
            expTest: Joi.string().regex(/red|green|blue/)
          }
        }, userSchema))
    })

    it('has results', function () {
      return flare
        .get('/experiments/expTest/results')
        .expect(200, Joi.array().includes(userSchema))
    })

    it('Removes from experiment', function () {
      return flare
        .del('/users/:joe.id/experiments/expTest')
        .expect(200, _.defaults({
          experiments: {}
        }, userSchema))
    })
  })
/*
    it('Adds to experiment', function (done) {
      request(app)
        .put('/user/' + uuid + '/experiment/expTest')
        .expect(200, {
          experiments: {
            expTest: /red|green|blue/
          }
        })
        .end(done)
    })

    it('Adds to experiment with assignment', function (done) {
      request(app)
        .put('/user/' + uuid + '/experiment/expTest/red')
        .expect(200, {
          experiments: {
            expTest: 'red'
          }
        })
        .end(done)
    })



    /*it('Creates with same experiments of matching ids', function () {

    })*/
/*
  })
*/
})
