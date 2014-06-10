/*eslint no-console:0*/
'use strict'
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/flak_cannon')
var uuid = require('node-uuid')

app.use(bodyParser())

var port = process.env.PORT || 3000
var router = express.Router()

var User = require('./models/user')

router.post('/user', function (req, res) {
  req.body.id = uuid.v4()
  var user = new User(req.body)

  user.save(function (err, user) {
    if (err) {
      return res.send(err)
    }

    res.json(user)
  })
})

router.get('/user/:id', function (req, res) {
  var id = req.params.id

  User.findOne({id: id}, function (err, user) {
    if (err) {
      return res.send(err)
    }

    res.json(user)
  })
})

router.put('/user/:id/convert/:name', function (req, res) {
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

app.use('/api', router)
module.exports = app
