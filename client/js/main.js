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
        // hmm....
        element: $el.childNodes[1],
        width: 500,
        height: 400,
        renderer: 'line',
        series: series
      })

      var hoverDetail = new Rickshaw.Graph.HoverDetail({
          graph: graph,
          yFormatter: Math.floor
      })

      var yAxis = new Rickshaw.Graph.Axis.Y({
          graph: graph
      })
      yAxis.render()

      var legend = new Rickshaw.Graph.Legend({
          graph: graph,

          // hmm....
          element: $el.childNodes[0]
      })

      graph.render()
    })
  }
}

recoil.view = function (ctrl) {
  return m('div.recoil', {config: recoil.config(ctrl)}, [
    m('div.legend'),
    m('div.chart')
  ])
}

var ctrl = new recoil.Controller()

m.render(document.getElementById('recoil'), recoil.view(ctrl))
