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
      res.send(500, err)
    })
  }
}

router.put('/_tests/reset', response(function (req, res) {
  return Promise.all([
    User.remove().exec(),
    Experiment.remove().exec(),
    Conversion.remove().exec()
  ])
}))

router.post('/users', response(function (req, res) {
  var defaultInfo = {
    ip: req.ip
  }

  if (req.headers['user-agent']) {

    // merge in user agent based info
    _.merge(defaultInfo, _.transform(req.useragent, function (obj, val, key) {
        if(val) {
          obj[key] = val
        }
    }))
  }

  var defaultUser = {
    id: uuid.v4(),
    info: defaultInfo
  }

  var user = new User(_.defaults(req.body, defaultUser))

  return User.findOne({clientId: user.clientId}).exec().then(function (member) {
    if (user.clientId && member) {
      user.experiments = member.experiments
      return Promise.promisify(user.save, user)()
      .then(_.first)
    }

    return User.findOne({group: user.group}).exec().then(function (member) {

      if (user.group && member) {
        user.experiments = member.experiments
        return Promise.promisify(user.save, user)()
        .then(_.first)
      }

      return Experiment.find().exec().then(function (experiments) {
        var experiment = _.sample(experiments)
        if (experiment) {
          var val = _.sample(experiment.values)

          if (!user.experiments) {
            user.experiments = {}
          }

          user.experiments[experiment.name] = val
        }

        return Promise.promisify(user.save, user)()
        .then(_.first)
      })
    })
  })
}))

router.get('/users/:id', response(function (req, res) {
  var id = req.params.id

  return User.findOne({id: id}).exec()
}))

router.delete('/users/:id/experiments/:name', isAdmin, response(function (req, res) {
  var id = req.params.id
  var name = req.params.name

  return User.findOne({id: id}).exec().then(function (user) {

    delete user.experiments[name]

    return Promise.promisify(user.save, user)()
    .then(_.first)
  })
}))

router.put('/users/:id/group/:group', isAdmin, response(function (req, res) {
  var id = req.params.id
  var group = req.params.group

  return User.findOne({id: id}).exec().then(function (user) {

    user.group = group
    return Promise.promisify(user.save, user)()
    .then(_.first)
  })
}))

router.put('/users/:id/experiments/:name/:val?', isAdmin, response(function (req, res) {
  var id = req.params.id
  var expName = req.params.name
  var val = req.params.val

  return Experiment.findOne({name: expName}).exec().then(function (experiment) {
    if (!experiment) {
      throw new Error('404')
    }

    return User.findOne({id: id}).exec().then(function (user) {
      if (!user) {
        throw new Error('404')
      }

      val = val || _.sample(experiment.values)
      user.experiments = user.experiments || {}
      user.experiments[expName] = val

      return User.update({id: id}, {$set: {
        'experiments': user.experiments
      }}).exec().then(function () {
        return user
      })
    })
  })
}))

router.put('/users/:userId/convert/:name', response(function (req, res) {
  var userId = req.params.userId
  var name = req.params.name
  var timestamp

  isAdmin(req, {
    setHeader: _.noop,
    end: _.noop
  }, function () {
    timestamp = req.query.timestamp
  })

  return User.findOne({id: userId}).exec().then(function (user) {
    var conversionConstructor = {
      name: name,
      userId: userId,
      experiments: user.experiments
    }

    if (timestamp) {
      conversionConstructor.timestamp = timestamp
    }

    var conversion = new Conversion(conversionConstructor)

    return Promise.promisify(conversion.save, conversion)()
    .then(_.first)
  })
}))

router.get('/conversions/uniq', response(function (req, res) {
  return Conversion.find({}, {name: 'true'}).exec().then(function (conversions) {
    return _.uniq(conversions, function (conv) {
      return conv.name
    })
  })
}))

router.post('/experiments', isAdmin, response(function (req, res) {
  var experiment = new Experiment(req.body)

  return Promise.promisify(experiment.save, experiment)()
  .then(_.first)
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

  return Conversion.find(query).exec().then(function (conversions) {
    function getUserIds(conversions) {
      var ids = {}
      var i = conversions.length
      while (i--) {
        ids[conversions[i].userId] = true
      }

      return Object.keys(ids)
    }

    var userIds = getUserIds(conversions)
    return User.find({id: {$in: userIds}}).exec().then(function (users) {
      users = _.zipObject(userIds, users)

      var conversionsBySplit = _.transform(conversions, function (results, conversion) {

        // join split info with conversion
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
