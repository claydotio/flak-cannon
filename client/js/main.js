/*globals m, document,Rickshaw,_*/
'use strict'
var recoil = {}

recoil.Results = function () {
  return m.request({
    method: 'GET',
    url: 'data.json'
  }).then(function (resultSeries) {
    return _.transform(resultSeries, function (resultSet, results) {
      _.forEach(results, function (result, key) {
        if (resultSet[key]) {
          resultSet[key].conversionCount += result.conversionCount
        } else {
          resultSet[key] = result
        }
      })
    }, {})
  })
}

recoil.controller = function () {
  this.results = new recoil.Results()
}

recoil.view = function (ctrl) {
  var titles = ['test']
    .concat(_.keys(_.values(ctrl.results())[0].splits))
    .concat(['conversions'])
  return m('table', titles.map(m.bind(m, 'th'))
  .concat(_.map(_.values(ctrl.results()), function (result) {
    return m('tr', [
      m('td', result.test)
    ]
    .concat(_.map(_.values(result.splits), m.bind(m, 'td') ))
    .concat([
      m('td', result.conversionCount)
    ]))
  })))
}

m.module(document.getElementById('recoil'), recoil)
