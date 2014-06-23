/*globals m, document,Rickshaw,_*/
'use strict'
var recoil = {}

recoil.Results = function () {
  return m.request({
    method: 'GET',
    url: '/api/experiments/signupText/results?' +
         'from=1/1/14&to=1/30/14&split=Platform,Browser&conversion=signUp'
  })
}

recoil.controller = function () {
  this.results = new recoil.Results()
}

recoil.sparkline = function (result) {
  return function ($el, isInit) {
    if (isInit) {
      return
    }

    var palette = new Rickshaw.Color.Palette()
    var graph = new Rickshaw.Graph({
      element: $el,
      width: 100,
      height: 50,
      renderer: 'line',
      series: [{
        data: _.map(result.data, function (datum, i) {
          return {
              x: i,
              y: datum.count
          }
        }),
        color: palette.color()
      }]
    })

    graph.render()

  }
}

recoil.view = function (ctrl) {
  var titles = ['test', 'sparkline']
    .concat(_.keys(ctrl.results()[0].splits))
    .concat(['conversions'])
  return m('table', titles.map(m.bind(m, 'th'))
  .concat(_.map(_.values(ctrl.results()), function (result) {
    return m('tr', [
      m('td', result.test),
      m('td', [m('div.sparkline', {config: recoil.sparkline(result)})])
    ]
    .concat(_.map(_.values(result.splits), m.bind(m, 'td') ))
    .concat([
      m('td', _.reduce(result.data, function (sum, datum) {
        return sum + datum.count
      }, 0))
    ]))
  })))
}

m.module(document.getElementById('recoil'), recoil)
