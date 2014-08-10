_ = require 'lodash'
uuid = require 'uuid'
Promise = require 'bluebird'

User = require '../models/user'
Experiments = require '../experiments'

class UserCtrl
  index: (req) ->
    User.findOne(id: req.params.id).exec().then (user) ->
      Experiments.getParams user.id
      .then (params) ->
        id: user.id
        params: params

  create: (req) ->
    metaId = req.body.id

    # If user exists, send it
    (if metaId
    then User.findOne({meta: {id: req.body.id}}).exec()
    else Promise.resolve(null))
    .then (user) ->
      if user
        return user

      # Otherwise create new user
      id = uuid.v4()
      ip = req.ip
      useragent = req.useragent
      meta = req.body or {}

      User.create
        id: id
        meta: _.defaults meta, {ip: ip}, useragent
      .then (user) ->
        Experiments.getParams user.id
        .then (params) ->
          id: user.id
          params: params

module.exports = new UserCtrl()
