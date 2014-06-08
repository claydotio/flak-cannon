/**
 * ExperimentController
 *
 * @description :: Server-side logic for managing experiments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _ = require('lodash')
module.exports = {
	results: function (req, res) {
	  var name = req.param('name')
    User.find().then(function (users) {
      users = _.filter(users, function (user) {
        return user.experiments && user.experiments[name]
      })
      res.json(users)
    }).then(null, function (err) {
      res.send(err)
    })
	},
  stats: function (req, res) {
    var name = req.param('name')
    User.find().then(function (users) {
      users = _.filter(users, function (user) {
        return user.experiments && user.experiments[name]
      })
      res.json(users)
    }).then(null, function (err) {
      res.send(err)
    })
  }
};
