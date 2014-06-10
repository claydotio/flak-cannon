/*eslint no-console:0*/
'use strict'
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/flak_cannon')
var uuid = require('node-uuid')
var _ = require('lodash')

app.use(bodyParser())

var port = process.env.PORT || 3000
var router = express.Router()

var User = require('./models/user')
var Experiment = require('./models/experiment')

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

router.post('/users', function (req, res) {
  req.body.id = uuid.v4()
  var user = new User(req.body)

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

router.get('/users/:id', function (req, res) {
  var id = req.params.id

  User.findOne({id: id}, function (err, user) {
    if (err) {
      return res.send(err)
    }

    res.json(user)
  })
})

router.delete('/users/:id/experiments/:name', function (req, res) {
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

router.put('/user/:id/experiments/:name/:val?', function (req, res) {
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

router.post('/experiments', function (req, res) {
  var experiment = new Experiment(req.body)

  experiment.save(function (err, experiment) {
    if (err) {
      return res.send(err)
    }

    res.json(experiment)
  })
})

router.get('/experiments/:name/results', function (req, res) {
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
