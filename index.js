/*eslint no-console:0*/
'use strict'
var express = require('express')
var bodyParser = require('body-parser')
var useragent = require('express-useragent')
var mongoose = require('mongoose')
var Promise = require('bluebird')
var uuid = require('node-uuid')
var _ = require('lodash')
var basicAuth = require('basic-auth-connect')

var sensitive = require('./sensitive')
var User = require('./models/user')
var Experiment = require('./models/experiment')
var Conversion = require('./models/conversion')
var isAdmin = basicAuth('admin', sensitive.adminPassword)

var database = process.env.NODE_ENV === 'test' ? 'flak_cannon_test' : 'flak_cannon'

var mongoHost = sensitive.mongo.host || 'localhost'
var mongoPort = sensitive.mongo.port || 27017
var mongoUser = sensitive.mongo.user
var mongoPass = sensitive.mongo.pass

var port = process.env.PORT || 3000
var router = express.Router()

mongoose.connect(sensitive.mongo.user ?
  'mongodb://' + mongoUser + ':' + mongoPass + '@' + mongoHost + ':' + mongoPort + '/' + database :
  'mongodb://' + mongoHost + ':' + mongoPort + '/' + database)


var app = express()
app.use(bodyParser())
app.use(useragent.express())

// CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

app.use('/api', router)
app.use(express.static(__dirname + '/client'))

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
      return Experiment.find({namespace: user.namespace}).exec().then(function (experiments) {
        var experiment = _.sample(experiments)
        if (experiment) {
          user.experiments[experiment.name] = _.sample(experiment.values)
        }

        return user
      })
    })
  })
}

router.put('/:namespace/_tests/reset', response(deleteAllData))

router.post('/:namespace/users', response(function (req, res) {
  var id = uuid.v4()
  var ip = req.ip
  var useragent = req.useragent
  var namespace = req.params.namespace

  var defaultUser = {
    id: id,
    namespace: namespace,
    info: _.defaults({
      ip: ip
    }, useragent),
    experiments: {}
  }

  var user = new User(_.defaults(req.body, defaultUser))
  return assignUserExperiments(user)
    .then(function (user) {
      return Promise.promisify(user.save, user)().then(_.first)
    })
}))

router.get('/:namespace/users/:id', response(function (req, res) {
  var id = req.params.id
  var namespace = req.params.namespace
  return User.findOne({id: id, namespace: namespace}).exec()
}))

router.delete('/:namespace/users/:id/experiments/:name', isAdmin, response(function (req, res) {
  var id = req.params.id
  var name = req.params.name
  var namespace = req.params.namespace

  return User.findOne({id: id, namespace: namespace}).exec().then(function (user) {
    delete user.experiments[name]
    return Promise.promisify(user.save, user)().then(_.first)
  })
}))

router.put('/:namespace/users/:id/group/:group', isAdmin, response(function (req, res) {
  var id = req.params.id
  var group = req.params.group
  var namespace = req.params.namespace

  return User.findOne({id: id, namespace: namespace}).exec().then(function (user) {
    user.group = group
    return Promise.promisify(user.save, user)().then(_.first)
  })
}))

router.put('/:namespace/users/:id/experiments/:name/:val?', isAdmin, response(function (req, res) {
  var id = req.params.id
  var expName = req.params.name
  var val = req.params.val
  var namespace = req.params.namespace

  return Promise.all([
    Experiment.findOne({name: expName, namespace: namespace}).exec(),
    User.findOne({id: id, namespace: namespace}).exec()
  ]).spread(function (experiment, user) {
    if (!experiment || !user) {
      throw new Error('404')
    }

    val = val || _.sample(experiment.values)
    user.experiments[expName] = val

    return User.update({id: id, namespace: namespace}, {$set: {
      'experiments': user.experiments
    }}).exec().then(function () {
      return user
    })
  })
}))

router.put('/:namespace/users/:userId/convert/:name', response(function (req, res) {
  var userId = req.params.userId
  var name = req.params.name
  var namespace = req.params.namespace

  return User.findOne({id: userId, namespace: namespace}).exec().then(function (user) {
    var conversionConstructor = {
      name: name,
      userId: userId,
      experiments: user.experiments,
      namespace: namespace
    }

    // only allow admins to set timestamps
    isAdmin(req, {setHeader: _.noop,end: _.noop}, function () {
      conversionConstructor.timestamp = req.query.timestamp
    })

    var conversion = new Conversion(conversionConstructor)

    return Promise.promisify(conversion.save, conversion)().then(_.first)
  })
}))

router.get('/:namespace/conversions/uniq', response(function (req, res) {
  var namespace = req.params.namespace
  return Conversion.find({namespace: namespace}, {name: true}).exec().then(function (conversions) {
    return _.uniq(conversions, 'name')
  })
}))

router.post('/:namespace/experiments', isAdmin, response(function (req, res) {
  var experiment = new Experiment(req.body)
  experiment.namespace = req.params.namespace

  return Promise.promisify(experiment.save, experiment)().then(_.first)
}))

router.delete('/:namespace/experiments/:name', isAdmin, response(function (req, res) {
  var name = req.params.name
  var namespace = req.params.namespace
  return Experiment.remove({name: name, namespace: namespace}).exec().then(function () {
    return {success: true}
  })
}))

router.get('/:namespace/experiments', isAdmin, response(function (req, res) {
  var namespace = req.params.namespace
  return Experiment.find({namespace: namespace}).exec().then()
}))

router.get('/:namespace/experiments/:name/results', isAdmin, response(function (req, res) {
  var name = req.params.name
  var namespace = req.params.namespace
  var startDate = new Date(req.query.from)
  var endDate = new Date(req.query.to)
  var splits = (req.query.split || '').split(',')
  var conversion = req.query.conversion

  var query = {
    'name': conversion,
    'timestamp': {
      $gte: startDate,
      $lte: endDate
    },
    namespace: namespace
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
    var userQuery = {
      namespace: namespace
    }
    userQuery['experiments.' + name] = {$exists: true}

    return User.find(userQuery).exec().then(function (users) {
      var usersById = _.transform(users, function (result, user) {
        result[user.id] = user
      }, {})

      // group conversions by split
      var conversionsBySplit = _.transform(conversions, function (results, conversion) {
        conversion.splits = conversion.splits || {}
        _.forEach(splits, function (split) {
          conversion.splits[split] = usersById[conversion.userId].info[split]
        })

        var testKey = conversion.experiments[name]
        var resultKey = testKey + ':' + _.map(splits, function (split) {
          return conversion.splits[split]
        }).join(':')

        results[resultKey] = results[resultKey] || []

        results[resultKey].push(conversion)
      }, {})

      var userCountsBySplit = _.countBy(users, function (user) {
        var testKey = user.experiments[name]
        var resultKey = testKey + ':' + _.map(splits, function (split) {
          return user.info[split]
        }).join(':')

        return resultKey
      })

      // TODO: Clean this up
      var results = _.values(
          _.transform(conversionsBySplit, function (results, conversions, key) {

          results[key] = {
            test: conversions[0].experiments[name],
            participantCount: userCountsBySplit[key],
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

module.exports = app
