_ = require 'lodash'
Promise = require 'bluebird'

Experiments = require '../experiments/index'
Conversion = require '../models/conversion'

class ResultCtrl
  index: (req) ->
    event = req.query.event
    param = req.query.param
    to = req.query.to or new Date()
    from = req.query.from

    if not from
      from = new Date()
      from.setDate from - 7

    query =
      event: event
      timestamp:
        $gte: new Date(from)
        $lte: new Date(to)

    query["params.#{param}"] = {$exists: true}

    viewQuery = _.defaults {event: 'view'}, _.cloneDeep query

    conversions = Conversion.aggregate [
      {$match: query}
      {$group:
        _id:
          param: "$params.#{param}"
          month:
            $month: '$timestamp'
          day:
            $dayOfMonth: '$timestamp'
          year:
            $year: '$timestamp'
        count:
          $sum: 1
      }
    ]
    .exec().then (conversions) ->
      _.map conversions, (conversion) ->
        _id = conversion._id
        date: new Date(_id.year, _id.month, _id.day)
        value: _id.param
        count: conversion.count

    views = Conversion.aggregate [
      {$match: viewQuery}
      {$group:
        _id:
          param: "$params.#{param}"
        count:
          $sum: 1
      }
    ]
    .exec()

    Promise.all [views, conversions]
    .spread (views, conversions) ->
      views: _.map views, (view) -> {param: view._id.param, count: view.count}
      counts: _.sortBy (_.values _.groupBy conversions, 'date'), 'date'

module.exports = new ResultCtrl()
