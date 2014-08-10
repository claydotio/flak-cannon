class UserCtrl
  index: ->
    {hello: 'world'}
  create: ->
    {hello: 'world!!!'}

module.exports = new UserCtrl()
