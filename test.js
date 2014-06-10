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

describe('Flak Cannon', function(){
  describe('User', function () {
    it('Creates', function(){
      return flare
        .post('/user', {})
        .expect(200, userSchema)
    })

    it('Creates with info', function () {
      return flare
        .post('/user', {
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
        .post('/user', {
          info: {
            id: '123',
            abc: 'def'
          }
        })
        .stash('joe')
        .get('/user/:joe.id')
        .expect(200, _.defaults({
          info: {
            id: '123',
            abc: 'def'
          }
        }, userSchema))
    })

    it('Converts actions', function () {
      return flare
        .post('/user', {
          info: {
            id: '123',
            abc: 'def'
          }
        })
        .stash('joe')
        .put('/user/:joe.id/convert/testing')
        .expect(200, _.defaults({
          conversions: {
            testing: 1
          }
        }, userSchema))
    })
  })
/*
  describe('Experiment', function () {
    var uuid = null

    it('Creates', function (done) {
      request(app)
        .post('/experiment')
        .send({
          name: 'expTest',
          values: ['red', 'green', 'blue']
        })
        .expect(200, {
          name: 'expTest',
          values: ['red', 'green', 'blue']
        })
        .end(done)
    })

    it('Gets new users', function (done) {
      request(app)
        .post('/user')
        .send({})
        .expect(200, {
          experiments: {
            expTest: /red|green|blue/
          }
        })
        .end(function (err, res) {
          uuid = res.body.uuid
          done(err)
        })
    })

    it('has results', function (done) {
      request(app)
        .get('/experiment/expTest/results')
        .expect(200, function (err, res) {
          var red = res.body.red
          var green = res.body.green
          var blue = res.body.blue

          if (red.length + green.length + blue.length !== 1) {
            return done(new Error('Bad results'))
          }

          done()
        })
    })

/*
    it('updates', function () {

    })

    it('removes', function () {

    })
*/
/*
    it('Removes from experiment', function (done) {
      request(app)
        .del('/user/' + uuid + '/experiment/expTest')
        .expect(200, {
          experiments: {}
        })
        .end(done)
    })

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
