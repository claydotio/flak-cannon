/*globals describe, it*/
'use strict'

var api = require('./')
var request = require('supertest')
var app = api().callback()

var uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

describe('Flak Cannon', function(){
  describe('User', function () {
    it('Creates', function(done){
      request(app)
        .post('/users')
        .send({})
        .expect(function (res) {
          if (!uuidRegExp.test(res.body.uuid)) {
            return 'missing uuid'
          }

          var user = {
            uuid: uuidRegExp,
            info: {
              abc: 'def'
            },
            experiments: {},
            conversions: {}
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
        .post('/users')
        .send({
          info: {
            abc: 'def'
          }
        })
        .expect(200, {
          uuid: uuidRegExp,
          info: {
            abc: 'def'
          },
          experiments: {},
          conversions: {}
        })
        .end(done)
    })

    it('Creates with id', function (done) {
      request(app)
        .post('/users')
        .send({
          info: {
            id: '123',
            abc: 'def'
          }
        })
        .expect(200, {
          uuid: uuidRegExp,
          info: {
            id: '123',
            abc: 'def'
          },
          experiments: {},
          conversions: {}
        })
        .end(done)
    })


    it('Gets users', function (done) {
      var uuid = null
      request(app)
        .post('/users')
        .send({
          info: {
            id: '123',
            abc: 'def'
          }
        })
        .end(function (err, res) {
          uuid = res.body.uuid
        })
        .get('/users/' + uuid)
        .expect(200, {
          uuid: uuidRegExp,
          info: {
            id: '123',
            abc: 'def'
          },
          experiments: {},
          conversions: {}
        })
        .end(done)
    })


    it('Converts actions', function (done) {
      var uuid = null
      request(app)
        .post('/users')
        .send({
          info: {
            id: '123',
            abc: 'def'
          }
        })
        .end(function (err, res) {
          uuid = res.body.uuid
        })
        .put('/users/' + uuid + '/conversions/testing')
        .expect(200, {
          uuid: uuidRegExp,
          info: {
            id: '123',
            abc: 'def'
          },
          experiments: {},
          conversions: {
            'testing': 1
          }
        })
        .end(done)
    })
  })

  describe('Experiment', function () {
    var uuid = null

    it('Creates', function (done) {
      request(app)
        .post('/experiments')
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
        .post('/users')
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
        .get('/experiments/expTest/results')
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
        .del('/users/' + uuid + '/experiments/expTest')
        .expect(200, {
          experiments: {}
        })
        .end(done)
    })

    it('Adds to experiment', function (done) {
      request(app)
        .put('/users/' + uuid + '/experiments/expTest')
        .expect(200, {
          experiments: {
            expTest: /red|green|blue/
          }
        })
        .end(done)
    })

    it('Adds to experiment with assignment', function (done) {
      request(app)
        .put('/users/' + uuid + '/experiments/expTest/red')
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
