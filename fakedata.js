'use strict'

var _ = require('lodash')
var Promise = require('bluebird')
var sensitive = require('./sensitive')
var app = require('./')
app.listen(3001)

var Flare = require('flare-gun')
var userAgents = ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36']

var numUsers = 1000

var experiments = [{
  name: 'signupText',
  values: ['signUp', 'joinFree', 'signUpFree', 'tryNow']
},{
  name: 'friendsList',
  values: ['none', 'left', 'right']
}]

var convertibles = ['signUp', 'redButtonPush', 'friendAdded', 'gamePlayed']

var numDays = 30

var flare = new Flare()
  .route('http://localhost:3001/api')
  .actor('admin', {
    auth: {
      user: 'admin',
      pass: sensitive.adminPassword
    }
  })
  .as('admin')
  .put('/_tests/reset')
  .flare(function (flare) {

    console.log('creating experiments')
    return Promise.map(experiments, function (experiment) {
      return flare
        .post('/experiments', experiment)
    })
  })
  .flare(function (flare) {

    console.log('creating users')
    return Promise.map(Array(numUsers), function (x, i) {
      return flare
        .request({
          uri: 'http://localhost:3001/api/users',
          method: 'post',
          headers: {
            'user-agent': _.sample(userAgents)
          }
        })
        .stash('x' + i)
    })
  })
  .flare(function (flare) {
    
    console.log('converting users')
    return Promise.map(Array(numDays), function (x, day) {
      return Promise.map(Array(numUsers), function (x, i) {
        if (Math.random() > 0.8) {
          var convertable = _.sample(convertibles)
          return flare
            .put('/users/:x' + i + '.id/convert/' +
                  convertable + '?timestamp=1/' + day + '/14')
        }
      })
    })
  })
  .then(function () {
    console.log('done!')
  })
