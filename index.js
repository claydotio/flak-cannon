/*eslint no-console:0*/
'use strict'
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var useragent = require('express-useragent')
var database = process.env.NODE_ENV === 'test' ? 'flak_cannon_test' : 'flak_cannon'
var mongoose = require('mongoose')
var sensitive = require('./sensitive')
var mongoHost = sensitive.mongo.host || 'localhost'
var mongoPort = sensitive.mongo.port || 27017
var mongoUser = sensitive.mongo.user
var mongoPass = sensitive.mongo.pass
var Promise = require('bluebird')

mongoose.connect(sensitive.mongo.user ?
  'mongodb://' + mongoUser + ':' + mongoPass + '@' + mongoHost + ':' + mongoPort + '/' + database :
  'mongodb://' + mongoHost + ':' + mongoPort + '/' + database)

var uuid = require('node-uuid')
var _ = require('lodash')
var basicAuth = require('basic-auth-connect')

app.use(bodyParser())
app.use(useragent.express())
app.all('/*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

var port = process.env.PORT || 3000
var router = express.Router()

var User = require('./models/user')
var Experiment = require('./models/experiment')
var Conversion = require('./models/conversion')

var isAdmin = basicAuth('admin', sensitive.adminPassword)

function response(fn) {
  return function (req, res) {
    Promise.try(fn, Array.prototype.slice.call(arguments, 0))
    .then(function (result) {
      res.json(result)
    })
    .catch(function (err) {
      if (err && err.message === '404') {
        return true
      }
    }, function () {
      res.send(404)
    })
    .catch(function (err) {
      console.error(err.stack)
      res.send(500, err)
    })
  }
}

function deleteAllData() {
  return Promise.all([
    User.remove().exec(),
    Experiment.remove().exec(),
    Conversion.remove().exec()
  ])
}

function userDefaults(ip, useragent) {
  var defaultInfo = _.defaults({
    ip: ip
  }, useragent)

  return {
    id: uuid.v4(),
    info: defaultInfo,
    experiments: {}
  }
}

function assignUserExperiments(user) {

  // same user, assign experiments the same
  return User.findOne({clientId: user.clientId}).exec().then(function (member) {

    var userAlreadyExists = user.clientId && member
    if (userAlreadyExists) {
      user.experiments = member.experiments
      return user
    }

    // same group, assign experiments the same
    return User.findOne({group: user.group}).exec().then(function (member) {

      var groupAlreadyExists = user.group && member
      if (groupAlreadyExists) {
        user.experiments = member.experiments
        return user
      }

      // brand new user, assign new experiment
      return Experiment.find().exec().then(function (experiments) {
        var experiment = _.sample(experiments)
        if (experiment) {
          user.experiments[experiment.name] = _.sample(experiment.values)
        }

        return user
      })
    })
  })
}

router.put('/_tests/reset', response(deleteAllData))

router.post('/users', response(function (req, res) {
  var user = new User(_.defaults(req.body, userDefaults(req.id, req.useragent)))
  return assignUserExperiments(user)
    .then(function (user) {
      return Promise.promisify(user.save, user)().then(_.first)
    })
}))

router.get('/users/:id', response(function (req, res) {
  return User.findOne({id: req.params.id}).exec()
}))

router.delete('/users/:id/experiments/:name', isAdmin, response(function (req, res) {
  var id = req.params.id
  var name = req.params.name

  return User.findOne({id: id}).exec().then(function (user) {
    delete user.experiments[name]
    return Promise.promisify(user.save, user)().then(_.first)
  })
}))

router.put('/users/:id/group/:group', isAdmin, response(function (req, res) {
  var id = req.params.id
  var group = req.params.group

  return User.findOne({id: id}).exec().then(function (user) {
    user.group = group
    return Promise.promisify(user.save, user)().then(_.first)
  })
}))

router.put('/users/:id/experiments/:name/:val?', isAdmin, response(function (req, res) {
  var id = req.params.id
  var expName = req.params.name
  var val = req.params.val

  return Promise.all([
    Experiment.findOne({name: expName}).exec(),
    User.findOne({id: id}).exec()
  ]).spread(function (experiment, user) {
    if (!experiment || !user) {
      throw new Error('404')
    }

    val = val || _.sample(experiment.values)
    user.experiments[expName] = val

    return User.update({id: id}, {$set: {
      'experiments': user.experiments
    }}).exec().then(function () {
      return user
    })
  })
}))

router.put('/users/:userId/convert/:name', response(function (req, res) {
  var userId = req.params.userId
  var name = req.params.name

  return User.findOne({id: userId}).exec().then(function (user) {
    var conversionConstructor = {
      name: name,
      userId: userId,
      experiments: user.experiments
    }

    // only allow admins to set timestamps
    isAdmin(req, {setHeader: _.noop,end: _.noop}, function () {
      conversionConstructor.timestamp = req.query.timestamp
    })

    var conversion = new Conversion(conversionConstructor)

    return Promise.promisify(conversion.save, conversion)().then(_.first)
  })
}))

router.get('/conversions/uniq', response(function (req, res) {
  return Conversion.find({}, {name: 'true'}).exec().then(function (conversions) {
    return _.uniq(conversions, 'name')
  })
}))

router.post('/experiments', isAdmin, response(function (req, res) {
  var experiment = new Experiment(req.body)

  return Promise.promisify(experiment.save, experiment)().then(_.first)
}))

router.delete('/experiments/:name', isAdmin, response(function (req, res) {
  var name = req.params.name
  return Experiment.remove({name: name}).exec().then(function () {
    return {success: true}
  })
}))

router.get('/experiments', isAdmin, response(function (req, res) {
  return Experiment.find({}).exec().then()
}))

router.get('/experiments/:name/results', isAdmin, response(function (req, res) {
  var name = req.params.name
  var startDate = new Date(req.query.from)
  var endDate = new Date(req.query.to)
  var splits = (req.query.split || '').split(',')
  var conversion = req.query.conversion

  var query = {
    'name': conversion,
    'timestamp': {
      $gte: startDate,
      $lte: endDate
    }
  }

  query['experiments.' + name] = {$exists: true}

  // get conversions in requested time range
  return Conversion.find(query).exec().then(function (conversions) {
    function getUserIds(conversions) {
      var ids = {}
      var i = conversions.length
      while (i--) {
        ids[conversions[i].userId] = true
      }

      return Object.keys(ids)
    }

    // join split info with conversion
    var userIds = getUserIds(conversions)
    return User.find({id: {$in: userIds}}).exec().then(function (users) {
      users = _.zipObject(userIds, users)

      var conversionsBySplit = _.transform(conversions, function (results, conversion) {
        conversion.splits = conversion.splits || {}
        _.forEach(splits, function (split) {
          conversion.splits[split] = users[conversion.userId].info[split]
        })

        var testKey = conversion.experiments[name]
        var resultKey = testKey + ':' + _.map(splits, function (split) {
              return conversion.splits[split]
            }).join(':')

        results[resultKey] = results[resultKey] || []

        results[resultKey].push(conversion)
      }, {})

      // TODO: Clean this up
      var results = _.values(
          _.transform(conversionsBySplit, function (results, conversions, key) {

          results[key] = {
            test: conversions[0].experiments[name],
            splits: conversions[0].splits,
            data: _.map(_.values(_.groupBy(conversions, function (conversion) {
              return conversion.timestamp.setHours(0,0,0,0)
            })), function (c) {
              return {
                count: c.length,
                timestamp: c[0].timestamp
              }
            })
          }
        }, {})
      )

      return results
    })
  })
}))

app.use('/api', router)
app.use(express.static(__dirname + '/client'))
module.exports = app
