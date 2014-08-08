SparkLine = (data) ->
  sparkline = ($el, isInit) ->
    if isInit
      return

    palette = new Rickshaw.Color.Palette()
    graph = new Rickshaw.Graph
      element: $el
      width: 100
      height: 50
      renderer: 'line'
      series: [
        data: _.map(data, (datum, i) ->
          x: i
          y: datum.count
        )
        color: palette.color()
      ]

    graph.render()

  m 'div.sparkline', {config: sparkline}

# Determine if two values are statistically different
# returns the p-value
#
# http://www.iancampbell.co.uk/twobytwo/n-1_theory.htm
# B is successful converions
# not-B is unsuccessful conversions
# A is test 1
# not-A is test 2
#
# formula
# (a*d - b*c)**2 * (N -1) / (m*n*r*s)
#
#          B  not-B  Total
# A     |  a    b      m
# not-A |  c    d      n
# Total |  r    s      N
#
nMinusOneChiSquare = (aConversions, aTotal, bConversions, bTotal) ->
  a = aConversions
  b = aTotal - aConversions
  c = bConversions
  d = bTotal - bConversions

  r = a + c
  s = b + d
  m = a + b
  n = c + d
  N = m + n + r + s

  chi2 = (a*d - b*c)**2 * (N - 1) / (m*n*r*s)
  z = Math.sqrt(Math.abs(chi2))
  1 - pFromZ(z)

pFromZ = (z) ->
  Z_MAX = 6.0

  if z == 0.0
    x = 0.0
  else
    y = 0.5 * Math.abs(z)
    if y > (Z_MAX * 0.5)
      x = 1.0
    else if y < 1.0
      w = y * y
      x = ((((((((0.000124818987 * w -
                  0.001075204047) * w + 0.005198775019) * w -
                  0.019198292004) * w + 0.059054035642) * w -
                  0.151968751364) * w + 0.319152932694) * w -
                  0.531923007300) * w + 0.797884560593) * y * 2.0
    else
      y -= 2.0
      x = (((((((((((((-0.000045255659 * y +
                        0.000152529290) * y - 0.000019538132) * y -
                        0.000676904986) * y + 0.001390604284) * y -
                        0.000794620820) * y - 0.002034254874) * y +
                        0.006549791214) * y - 0.010557625006) * y +
                        0.011630447319) * y - 0.009279453341) * y +
                        0.005353579108) * y - 0.002141268741) * y +
                        0.000535310849) * y + 0.999936657524
  if z > 0.0 then ((x + 1.0) * 0.5) else ((1.0 - x) * 0.5)

isPSignificant = (p) ->
  p > 0.05

class ResultModel
  transform:(data) ->

    # count total conversions
    data = data.map (result) ->
      result.totalConversions = _.reduce(result.data, (sum, datum) ->
        sum + datum.count
      , 0)
      return result

    # calculate p-value and percentage change against the first result
    if !data[0]
      return []
    control = data[0]
    control.p = 0
    control.percentDelta = 0

    data = data.slice(1).map (result) ->
      aConversions = result.totalConversions
      aTotal = result.participantCount
      bConversions = control.totalConversions
      bTotal = control.participantCount

      aPercent = aConversions / aTotal
      bPercent = bConversions / bTotal
      percentDelta = aPercent - bPercent

      p = nMinusOneChiSquare(
        aConversions,
        aTotal,
        bConversions,
        bTotal)

      result.p = p
      result.percentDelta = percentDelta

      return result

    data = [control].concat _.sortBy(data, 'percentDelta').reverse()
    return data


  data: do ->
    def = m.deferred()
    def.resolve([])
    def.promise
  query: (q) =>
    q = _.defaults q,
       experiment: ''
       start: ''
       end: ''
       splits: ''
       conversion: ''
       namespace: ''

    m.request
      method: 'GET'
      url: """/api/#{q.namespace}/experiments/#{q.experiment}/results
        ?from=#{moment(q.start).format('L')}
        &to=#{moment(q.end).format('L')}
        &split=#{q.splits}
        &conversion=#{q.conversion}"""
    .then(@transform).then(@data)

QueryBuilder = (queryHandler) ->
  experiment = m.prop 'signupText'
  start = m.prop moment().subtract('days', 14).format('L').toString()
  end = m.prop moment().format('L').toString()
  splits = m.prop ''
  conversion = m.prop 'signUp'
  namespace = m.prop ''

  query = ->
    queryHandler
      experiment: experiment()
      start: start()
      end: end()
      splits: splits(),
      conversion: conversion()
      namespace: namespace()

  ->
    m 'div', [
      m 'input',
        value: namespace()
        placeholder: 'namespace'
        onchange: m.withAttr('value', namespace)
      m 'input',
        value: experiment()
        placeholder: 'experiment'
        onchange: m.withAttr('value', experiment)
      m 'input',
        value: start()
        placeholder: 'start'
        onchange: m.withAttr('value', start)
      m 'input',
        value: end()
        placeholder: 'end'
        onchange: m.withAttr('value', end)
      m 'input',
        value: splits()
        placeholder: 'splits (, separated)'
        onchange: m.withAttr('value', splits)
      m 'input',
        value: conversion()
        placeholder: 'conversion'
        onchange: m.withAttr('value', conversion)
      m 'button',
        onclick: query,
        'go'
    ]

ExperimentStore = do ->
  data = m.request
    method: 'GET'
    url: '/api/experiments'

  getAll: ->
    data

ConversionStore = do ->
  data = m.request
    method: 'GET'
    url: '/api/conversions/uniq'

  getAll: ->
    data

ExperimentState = (experiments) ->
  m 'ul', experiments.map (experiment) ->
    m 'li', [
      experiment.name + " (#{experiment.namespace})",
      m 'ul',
        experiment.values.map (val) ->
          m 'li', val
    ]

ConversionState = (conversions) ->
  m 'ul', conversions.map (conversion) ->
    m 'li', conversion.name + " (#{conversion.namespace})"

ShowState = (experiments, conversions) ->
  [
    'Experiments',
    ExperimentState(experiments),
    'Conversions',
    ConversionState(conversions)
  ]

RecoilController = ->
  results = new ResultModel
  results: results
  experiments: ExperimentStore.getAll()
  conversions: ConversionStore.getAll()
  queryBuilder: QueryBuilder(results.query)

RecoilView = (ctrl) ->
  results = ctrl.results.data() or []
  titles = ['test', 'sparkline']
    .concat(if results[0] then _.keys(results[0].splits))
    .concat(['conversions', 'participants',
             'percent', 'p < 0.05', 'delta'])

  percent = (n) ->
    (n * 100).toFixed(2) + '%'

  return [
    ShowState(ctrl.experiments(), ctrl.conversions())
    m 'br'
    ctrl.queryBuilder()
    m 'br'
    unless results.length then 'NO RESULTS'
    m('table', titles.map(m.bind(m, 'th'))
    .concat(_.map(_.values(results), (result) ->
      color = if result.percentDelta > 0 then 'green' else
              if result.percentDelta == 0 then 'black' else 'red'

      return m('tr', [
        m('td', result.test),
        m('td', [SparkLine(result.data)])
      ]
      .concat(_.map(_.values(result.splits), m.bind(m, 'td') ))
      .concat([
        m 'td', result.totalConversions
        m 'td', result.participantCount
        m 'td', percent result.totalConversions / result.participantCount
        m 'td', result.p.toFixed(3)
        m 'td', style: color: color, percent result.percentDelta
      ]))
    )))
  ]

m.module document.getElementById('recoil'),
        {controller: RecoilController, view: RecoilView}
