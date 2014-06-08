/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 'use strict'

var uuid = require('node-uuid')
var _ = require('lodash')

function assignExperiments(user) {
  return User.findOne({'info.id': user.info.id || -1}).then(function (user) {
    if (user) {
      return user.experiments
    }

    return Experiment.find().then(function (experiments) {
      var experiment = _.sample(experiments)
      if (!experiment) {
        return {}
      }
      var target = {}
      target[experiment.name] = _.sample(experiment.values)
      return target
    })
  })
}

module.exports = {
	create: function (req, res) {
    assignExperiments(req.body).then(function (experiments) {
      req.body = _.defaults(req.body, {
          info: {},
          experiments: experiments,
          conversions: {}
      })
      req.body.id = req.body.id || uuid.v4()

  	  User.create(req.body).then(function (user) {
  	    res.json(user)
  	  })
    })

	},

  convert: function (req, res) {
    var id = req.param('id')
    var name = req.param('name')

    User.findOne(id).then(function (user) {
      if (!user.conversions[name]) {
        user.conversions[name] = 1
      } else {
        user.conversions[name] += 1
      }
      console.log('saving', user)
      user.save(function (err) {
        res.json(user)
      })

    }).then(null,function (err) {
      res.send(err)
    })
  },

  addExperiment: function (req, res) {
    var id = req.param('id')
    var name = req.param('name')
    var value = req.param('value')
    User.findOne(id).then(function (user) {
      user.experiments[name] = value
      user.save(function (err) {
        res.json(user)
      })
    }).then(null,function (err) {
      res.send(err)
    })
  },

  removeExperiment: function (req, res) {
    var id = req.param('id')
    var name = req.param('name')
    User.findOne(id).then(function (user) {
      delete user.experiments[name]
      user.save(function (err) {
        res.json(user)
      })
    }).then(null,function (err) {
      res.send(err)
    })
  }
}
