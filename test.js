/*globals describe, it*/
'use strict'

var app = require('./')
var sensitive = require('./sensitive')
var Flare = require('flare-gun')
var flare = new Flare()
  .route('http://localhost:3001/api')
  .docFile('doc.json')
  .actor('admin', {
    auth: {
      user: 'admin',
      pass: sensitive.adminPassword
    }
  })
  .actor('anon')
  .as('anon')

var Joi = require('joi')
var _ = require('lodash')
var Promise = require('bluebird')
var uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

app.listen(3001)

var userSchema = {
  id: Joi.string().regex(uuidRegExp).required(),
  group: Joi.string(),
  clientId: Joi.string(),
  info: Joi.object(),
  experiments: Joi.object()
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
        .doc('User', 'create')
    })

    it('Creates with default info', function () {
      return flare
        .request({
          uri: 'http://localhost:3001/api/users',
          method: 'post',
          headers: {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36'
          }
        })
        .expect(200, _.defaults({
          info: Joi.object().keys({
            ip: '127.0.0.1',
            browser: 'Chrome',
            isDesktop: true
          }).unknown()
        }, userSchema))
    })

    it('Gets users', function () {
      return flare
        .post('/users', {
          group: '123',
          info: {
            abc: 'def'
          }
        })
        .stash('joe')
        .get('/users/:joe.id')
        .expect(200, _.defaults({
          group: '123',
          info: {
            abc: 'def'
          }
        }, userSchema))
        .doc('User', 'get')
    })

    it('Updates group', function () {
      return flare
        .as('anon')
        .put('/users/:joe.id/group/same')
        .expect(401)
        .as('admin')
        .put('/users/:joe.id/group/same')
        .expect(200, _.defaults({
          group: 'same'
        }, userSchema))
        .doc('(Admin) User', 'set testing group')
    })
  })

  describe('Experiment', function () {
    it('is protected', function () {
      return flare
        .as('anon')
        .post('/experiments')
        .expect(401)
    })

    it('Creates', function () {
      return flare
        .as('admin')
        .post('/experiments', {
          name: 'expTest',
          values: ['red', 'green', 'blue', 'a', 'b', 'c', 'd', 'e', 'f']
        })
        .stash('expTest')
        .expect(200, _.defaults({
          name: 'expTest',
          values: Joi.array().includes(Joi.string())
        }, experimentSchema))
        .doc('(Admin) Experiment', 'create')
    })

    it('Removes', function () {
      return flare
        .as('admin')
        .del('/experiments/:expTest.name')
        .expect(200)
        .doc('(Admin) Experiment', 'remove')
    })

    it('Gets new users', function () {
      return flare
        .as('admin')
        .post('/experiments', {
          name: 'expTest',
          values: ['red', 'green', 'blue', 'a', 'b', 'c', 'd', 'e', 'f']
        })
        .stash('expTest')
        .post('/users', {
          group: 'tester'
        })
        .stash('joe')
        .expect(200, _.defaults({
          experiments: {
            expTest: Joi.string().regex(/red|green|blue|a|b|c|d|e|f/)
          }
        }, userSchema))
    })

    it('has results', function () {
      return flare
        .as('admin')
        .get('/experiments/expTest/results')
        .expect(200, Joi.array().includes(userSchema))
        .doc('(Admin) Experiment', 'results')
    })

    it('Removes from experiment', function () {
      return flare
        .as('anon')
        .del('/users/:joe.id/experiments/expTest')
        .expect(401)
        .as('admin')
        .del('/users/:joe.id/experiments/expTest')
        .expect(200, _.defaults({
          experiments: {}
        }, userSchema))
        .doc('(Admin) User', 'remove from experiment')
    })

    it('Adds to experiment', function () {
      return flare
        .as('anon')
        .put('/users/:joe.id/experiments/expTest')
        .expect(401)
        .as('admin')
        .put('/users/:joe.id/experiments/expTest')
        .expect(200, _.defaults({
          experiments: {
            expTest: Joi.string().regex(/red|green|blue|a|b|c|d|e|f/).required()
          }
        }, userSchema))
        .doc('(Admin) User', 'add to experiment')
    })

    it('Adds to experiment with assignment', function () {
      return flare
        .as('anon')
        .put('/users/:joe.id/experiments/expTest/red')
        .expect(401)
        .as('admin')
        .put('/users/:joe.id/experiments/expTest/red')
        .expect(200, _.defaults({
          group: 'tester',
          experiments: {
            expTest: 'red'
          }
        }, userSchema))
        .doc('(Admin) User', 'add to experiment, with value')
    })

    it('Creates with same experiments of matching group', function () {
      return flare
        .post('/users', {
          group: 'joegroup'
        })
        .stash('joe')
        .then(function (flare) {
          return Promise.map(Array(10), function () {
            return flare
            .post('/users', {
              group: 'joegroup'
            })
            .expect(200, _.defaults({
              experiments: {
                expTest: ':joe.experiments.expTest'
              }
            }, userSchema))
          })
        })
    })

    it('Creates new test regardless of empty group', function () {
      return flare
        .post('/users', {})
        .as('admin')
        .del('/experiments/:expTest.name')
        .post('/users', {})
        .expect(200, _.defaults({
          experiments: {}
        }, userSchema))
    })

    it('Creates with same experiments of matching clientId', function () {
      return flare
        .post('/experiments', {
          name: 'expTest',
          values: ['red', 'green', 'blue', 'a', 'b', 'c', 'd', 'e', 'f']
        })
        .stash('expTest')
        .post('/users', {
          clientId: '123'
        })
        .stash('joe')
        .then(function (flare) {
          return Promise.map(Array(10), function () {
            return flare
            .post('/users', {
              clientId: '123'
            })
            .expect(200, _.defaults({
              experiments: {
                expTest: ':joe.experiments.expTest'
              }
            }, userSchema))
          })
        })
    })
  })

  describe('Results', function () {
    it('Converts actions', function () {
      return flare
        .post('/users', {
          group: '123',
          info: {
            abc: 'def'
          }
        })
        .stash('joe')
        .as('admin')
        .post('/experiments', {
          name: 'convertible',
          values: ['a', 'b']
        })
        .expect(200)
        .put('/users/:joe.id/experiments/convertible')
        .expect(200)
        .as('anon')
        .put('/users/:joe.id/convert/testing')
        .expect(200, {
          name: 'testing',
          userId: ':joe.id',
          experiments: Joi.array().includes('expTest').required(),
          timestamp: Joi.date()
        })
        .doc('User', 'convert')
        .put('/users/:joe.id/convert/testing?timestamp=1/2/14')
        .expect(200, {
          name: 'testing',
          userId: ':joe.id',
          experiments: Joi.array().includes('expTest').required(),
          timestamp: Joi.date('1/2/14')
        })

    })
/*
    it('Gets user conversion results', function () {
      return flare
        .request({
          uri: 'http://localhost:3001/api/users',
          method: 'post',
          headers: {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36'
          }
        })
        .stash('joe1')
        .request({
          uri: 'http://localhost:3001/api/users',
          method: 'post',
          headers: {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36'
          }
        })
        .stash('joe2')
        .as('admin')
        .post('/experiments', {
          name: 'dingdong',
          values: ['a', 'b']
        })
        .expect(200)
        .put('/users/:joe1.id/experiments/dingdong/a')
        .expect(200)
        .put('/users/:joe2.id/experiments/dingdong/b')
        .expect(200)

        .post('/users/:joe1.id/convert/ding?timestamp=1/1/14')
        .post('/users/:joe1.id/convert/ding?timestamp=1/2/14')
        .post('/users/:joe1.id/convert/ding?timestamp=1/3/14')
        .post('/users/:joe1.id/convert/ding?timestamp=1/3/14')

        .post('/users/:joe2.id/convert/ding?timestamp=1/1/14')
        .post('/users/:joe2.id/convert/ding?timestamp=1/1/14')
        .post('/users/:joe2.id/convert/ding?timestamp=1/2/14')
        .post('/users/:joe2.id/convert/ding?timestamp=1/3/14')
        .post('/users/:joe2.id/convert/ding?timestamp=1/4/14')

        .get('/experiments/dingdong/results?' +
             'from=1/1/14&to=1/3/14&split=platform,browser&conversion=ding')
        .expect(200, Joi.array().includes({
          a: {
            'abc': Joi.number()
          },
          b: {
            'abc': Joi.number()
          }
        }))
        .then(function (flare) {
          /*
          [{
            // experiment test key
            expVal1: {

              // split : signups
              'platform1:browser1': 10,
              'platform2:browser1': 20,
              'platform1:browser2': 100
            },
            expVal2: {
              // ...
            }
            // ...
          }]
          console.log(flare.res.body)
        })
    })*/
  })
})
