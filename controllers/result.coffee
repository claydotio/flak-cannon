_ = require 'lodash'
Promise = require 'bluebird'
moment = require 'moment'

Experiments = require '../experiments/index'
Conversion = require '../models/conversion'


eventRangeMatch = (event, from, to) ->
  event: event
  timestamp:
    $gte: new Date(from)
    $lt: new Date(to)

conversionMatch = (event, from, to, param) ->
  match = eventRangeMatch(event, from, to)

  if param
    match["params.#{param}"] = {$exists: true}

  return match

conversionGroup = (param) ->
  group =
    _id:
      month:
        $month: '$timestamp'
      day:
        $dayOfMonth: '$timestamp'
      year:
        $year: '$timestamp'
    count:
      $sum: 1

  if param
    group._id.param = "$params.#{param}"

  return group

dauGroup = (param) ->
  group =
    _id:
      day: { $dayOfMonth: '$timestamp' }
      month: { $month: '$timestamp' }
      year: { $year: '$timestamp' }
      userId: '$userId'

  if param
    group._id.param = "$params.#{param}"

  return group

d7Match = (from, to, param) ->
  from = moment(new Date from).subtract 7, 'days'
  to = moment(new Date to).subtract 7, 'days'
  match = eventRangeMatch('signup', from, to)

  if param
    match["params.#{param}"] = {$exists: true}

  return match

countByParam = (param) ->
  _id: if param then param: "$params.#{param}" else null
  count:
    $sum: 1

countByIdParam = (param) ->
  _id: if param then param: '$_id.param' else null
  count:
    $sum: 1

class ResultCtrl
  index: (req) ->
    event = req.query.event
    param = req.query.param
    to = req.query.to or new Date()
    from = req.query.from or moment().subtract 7, 'days'
    viewCounter = req.query.viewCounter

    param = if param is '*' then null else param

    conversions = Conversion.aggregate [
      {$match: conversionMatch(event, from, to, param)}
      {$group: conversionGroup(param) }
    ]
    .exec().then (conversions) ->
      _.map conversions, (conversion) ->
        _id = conversion._id
        # JS Date's month is indexed from 0 to 11, mongo does 1 to 12
        date: new Date(_id.year, _id.month - 1, _id.day)
        value: _id?.param
        count: conversion.count

    views = switch viewCounter
      when 'dau' then Conversion.aggregate([
          {$match: eventRangeMatch('view', from, to)}
          {$group: dauGroup(param)}
          {$group: countByIdParam(param)}
        ]).exec()
      when 'd7' then Conversion.aggregate([
          {$match: d7Match(from, to, param)}
          {$group: countByParam(param)}
        ]).exec()
      else Conversion.aggregate([
          {$match: eventRangeMatch('view', from, to)}
          {$group: countByParam(param)}
        ]).exec()

    Promise.all [views, conversions]
    .spread (views, conversions) ->
      views: _.map views, (view) -> {param: view._id?.param, count: view.count}
      counts: _.sortBy (_.values _.groupBy conversions, 'date'), 'date'

module.exports = new ResultCtrl()
