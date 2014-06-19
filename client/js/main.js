/*globals m, document,Rickshaw,_*/
'use strict'
var recoil = {}

recoil.Results = function () {
  return m.request({
    method: 'GET',
    url: 'data.json'
  })
}

recoil.Controller = function () {
  this.results = new recoil.Results()
}

recoil.config = function (ctrl) {
  return function drawChart($el, isInit) {
    if (isInit) {
      return
    }

    var palette = new Rickshaw.Color.Palette()

    ctrl.results.then(function (data) {
      var flattened = _.map(data, function (day) {
        return _.transform(day, function (flat, results, experimentName) {
          _.forEach(results, function (result, name) {
            flat[experimentName + ':' + name] = result
          })
        }, {})
      })

      var series = _.map(Object.keys(flattened[0]), function (key) {
        return {
          name: key,
          data: _.map(flattened, function (flat, i) {
            return {
              x: i,
              y: flat[key]
            }
          }),
          color: palette.color()
        }
      })

      var graph = new Rickshaw.Graph({
        element: $el,
        width: 500,
        height: 400,
        renderer: 'line',
        series: series
      })

      var hoverDetail = new Rickshaw.Graph.HoverDetail({
          graph: graph
      })

      var xAxis = new Rickshaw.Graph.Axis.Time({
          graph: graph
      })
      xAxis.render()

      var yAxis = new Rickshaw.Graph.Axis.Y({
          graph: graph
      })
      yAxis.render()

      graph.render()
    })
  }
}

recoil.view = function (ctrl) {
  return [
    m('div.chart', {config: recoil.config(ctrl)})
  ]
}

var ctrl = new recoil.Controller()

m.render(document.getElementById('recoil'), recoil.view(ctrl))
