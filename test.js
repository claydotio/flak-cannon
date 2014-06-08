/*globals describe, it*/
'use strict'

var api = require('./')
var request = require('supertest')
var app = 'http://localhost:1337' //api().callback()
var chai = require('chai')
var expect = chai.expect

var uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

var user = {
  id: uuidRegExp,
  info: {
    abc: 'def'
  },
  experiments: {},
  conversions: {}
}

describe('Flak Cannon', function(){
  describe('User', function () {
    it('Creates', function(done){
      request(app)
        .post('/user')
        .send({})
        .expect(function (res) {
          if (!uuidRegExp.test(res.body.id)) {
            return 'missing uuid'
          }

          for(var key in user) {
            if (!res.body[key]) {
              return 'missing: ' + key
            }
          }
        })
        .end(done)
    })

    it('Creates with info', function (done) {
      request(app)
        .post('/user')
        .send({
          info: {
            abc: 'def'
          }
        })
        .expect(function (res) {
          expect(res.body.info.abc).to.equal('def')

          for(var key in user) {
            if (!res.body[key]) {
              return 'missing: ' + key
            }
          }
        })
        .end(done)
    })

    it.only('Gets users', function (done) {
      var id = null
      request(app)
        .post('/user')
        .send({
          info: {
            id: '123',
            abc: 'def'
          }
        })
        .end(function (err, res) {
          id = res.body.id

          request(app)
            .get('/user/' + id)
            .expect(function (res) {
              expect(res.body.info.abc).to.equal('def')
              expect(res.body.info.id).to.equal('123')

              for(var key in user) {
                if (!res.body[key]) {
                  return 'missing: ' + key
                }
              }
            })
            .end(done)
        })


    })


    it.only('Converts actions', function (done) {
      var uuid = null
      request(app)
        .post('/user')
        .send({
          info: {
            id: '123',
            abc: 'def'
          }
        })
        .end(function (err, res) {
          uuid = res.body.id
          request(app)
            .put('/user/' + uuid + '/conversions/testing')
            .expect(function (res) {
              expect(res.body.conversions.testing).to.equal(1)
            })
            .end(done)
        })

    })
  })

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

  })

})
