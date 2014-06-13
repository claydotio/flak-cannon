/*eslint no-console:0*/
'use strict'
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var useragent = require('express-useragent')
var database = process.env === 'test' ? 'flak_cannon_test' : 'flak_cannon'
var mongoose = require('mongoose')
var sensitive = require('./sensitive')
var mongoHost = sensitive.mongo.host || 'localhost'
var mongoPort = sensitive.mongo.port || 27017
var mongoUser = sensitive.mongo.user
var mongoPass = sensitive.mongo.pass
mongoose.connect(sensitive.mongo.user ?
  'mongodb://' + mongoUser + ':' + mongoPass + '@' + mongoHost + ':' + mongoPort + '/' + database :
  'mongodb://' + mongoHost + ':' + mongoPort + '/' + database)
var uuid = require('node-uuid')
var _ = require('lodash')
var basicAuth = require('basic-auth-connect')


app.use(bodyParser())
app.use(useragent.express())

var port = process.env.PORT || 3000
var router = express.Router()

var User = require('./models/user')
var Experiment = require('./models/experiment')

var isAdmin = basicAuth('admin', sensitive.adminPassword)

if (process.env === 'test') {
  router.put('/_tests/reset', function (req, res) {
    User.remove(function (err) {
      if (err) {
        return res.send(err)
      }
      Experiment.remove(function (err) {
        if (err) {
          return res.send(err)
        }

        res.json({success: true})
      })
    })
  })
}

router.post('/users', function (req, res) {
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

  User.findOne({group: user.group}, function (err, member) {
    if (err) {
      return res.send(err)
    }

    if (member) {
      user.experiments = member.experiments
      return user.save(function (err, user) {
        if (err) {
          return res.send(err)
        }

        res.json(user)
      })
    }

    Experiment.find(function (err, experiments) {
      var experiment = _.sample(experiments)
      if (experiment) {
        var val = _.sample(experiment.values)

        if (!user.experiments) {
          user.experiments = {}
        }

        user.experiments[experiment.name] = val
      }

      user.save(function (err, user) {
        if (err) {
          return res.send(err)
        }

        res.json(user)
      })
    })
  })
})

router.get('/users/:id', function (req, res) {
  var id = req.params.id

  User.findOne({id: id}, function (err, user) {
    if (err) {
      return res.send(err)
    }

    res.json(user)
  })
})

router.delete('/users/:id/experiments/:name', isAdmin, function (req, res) {
  var id = req.params.id
  var name = req.params.name

  User.findOne({id: id}, function (err, user) {
    if (err) {
      return res.send(err)
    }

    delete user.experiments[name]
    user.save(function (err, user) {
      if (err) {
        return res.send(err)
      }

      res.json(user)
    })
  })
})

router.put('/users/:id/group/:group', isAdmin, function (req, res) {
  var id = req.params.id
  var group = req.params.group

  User.findOne({id: id}, function (err, user) {
    if (err) {
      return res.send(err)
    }

    user.group = group
    user.save(function (err, user) {
      if (err) {
        return res.send(err)
      }

      res.json(user)
    })
  })
})

router.put('/users/:id/experiments/:name/:val?', isAdmin, function (req, res) {
  var id = req.params.id
  var expName = req.params.name
  var val = req.params.val

  Experiment.findOne({name: expName}, function (err, experiment) {
    if (err) {
      return res.send(err)
    }

    User.findOne({id: id}, function (err, user) {
    if (err) {
      return res.send(err)
    }
    val = val || _.sample(experiment.values)
    user.experiments[expName] = val

    user.save(function (err, user) {
        if (err) {
          return res.send(err)
        }

        res.json(user)
      })
    })
  })
})

router.put('/users/:id/convert/:name', function (req, res) {
  var id = req.params.id
  var name = req.params.name

  User.findOne({id: id}, function (err, user) {
    if (err) {
      return res.send(err)
    }

    if (!user.conversions) {
      user.conversions = {}
    }

    if (!user.conversions[name]) {
      user.conversions[name] = 1
    } else {
      user.conversions[name] += 1
    }

    user.save(function (err, user) {
      if (err) {
        return res.send(err)
      }

      res.json(user)
    })
  })
})

router.post('/experiments', isAdmin, function (req, res) {
  var experiment = new Experiment(req.body)

  experiment.save(function (err, experiment) {
    if (err) {
      return res.send(err)
    }

    res.json(experiment)
  })
})

router.get('/experiments/:name/results', isAdmin, function (req, res) {
  var name = req.params.name
  var query = {}
  query['experiments.' + name] = {$exists: true}
  User.find(query, function (err, users) {
    if (err) {
      return res.send(err)
    }

    res.json(users)
  })
})

app.use('/api', router)
module.exports = app
