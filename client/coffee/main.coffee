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

ResultStore = do ->
  data = m.request
    method: 'GET'
    url: '''/api/experiments/signupText/results?
         from=1/1/14&to=1/30/14&split=Platform,Browser&conversion=signUp'''

  getAll: ->
    data
  query: (q) ->
    q = _.defaults q,
       experiment: ''
       start: ''
       end: ''
       splits: ''
       conversion: ''

    m.request
      method: 'GET'
      url: """/api/experiments/#{q.experiment}/results
      ?from=#{moment(q.start).format('L')}
      &to=#{moment(q.end).format('L')}
      &split=#{q.splits}
      &conversion=#{q.conversion}"""
    .then(data)

QueryBuilder = (queryHandler) ->
  experiment = m.prop 'signupText'
  start = m.prop moment().subtract('days', 14).format('L').toString()
  end = m.prop moment().format('L').toString()
  splits = m.prop ''
  conversion = m.prop 'signUp'

  query = ->
    queryHandler
      experiment: experiment()
      start: start()
      end: end()
      splits: splits(),
      conversion: conversion()
  ->
    m 'div', [
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
      experiment.name,
      m 'ul',
        experiment.values.map (val) ->
          m 'li', val
    ]

ConversionState = (conversions) ->
  m 'ul', conversions.map (conversion) ->
    m 'li', conversion.name

ShowState = (experiments, conversions) ->
  [
    'Experiments',
    ExperimentState(experiments),
    'Conversions',
    ConversionState(conversions)
  ]

RecoilController = ->
  results: ResultStore.getAll()
  experiments: ExperimentStore.getAll()
  conversions: ConversionStore.getAll()

QueryView = QueryBuilder(ResultStore.query)

RecoilView = (ctrl) ->
  titles = ['test', 'sparkline']
    .concat(if ctrl.results()[0] then _.keys(ctrl.results()[0].splits))
    .concat(['conversions'])

  return [
    ShowState(ctrl.experiments(), ctrl.conversions())
    m 'br'
    QueryView()
    m 'br'
    m('table', titles.map(m.bind(m, 'th'))
    .concat(_.map(_.values(ctrl.results()), (result) ->
      return m('tr', [
        m('td', result.test),
        m('td', [SparkLine(result.data)])
      ]
      .concat(_.map(_.values(result.splits), m.bind(m, 'td') ))
      .concat([
        m('td', _.reduce(result.data, (sum, datum) ->
          return sum + datum.count
        , 0))
      ]))
    )))
  ]

m.module document.getElementById('recoil'),
        {controller: RecoilController, view: RecoilView}
