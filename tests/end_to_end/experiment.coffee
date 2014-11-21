Flare = require 'flare-gun'
Joi = require 'joi'

app = require '../../'

flare = new Flare().express(app)

describe 'Experiment Routes', ->
  it '[legacy] gets experiment parameters', ->
    flare
      .post '/experiments', {id: 123}
      .expect 200,
        login_button: 'red'

  it 'gets experiment parameters', ->
    flare
      .post '/experiments', {userId: 123}
      .expect 200,
        login_button: 'red'

  it 'gets all experiments', ->
    flare
      .get '/experiments'
      .expect 200, Joi.array().includes
        id: Joi.string()

  it 'creates mapping based on `from` user if exists', ->
    flare
      .post '/experiments', {userId: 3212, fromUserId: 123}
      .expect 200,
        login_button: 'red'
      .post '/experiments', {userId: 3212}
      .expect 200,
        login_button: 'red'

  it 'creates overrides', ->
    flare
      .post '/experiments/override',
        {userId: 999, params: {test: 'abc', hello: 'world'}}
      .expect 200,
        999: {test: 'abc', hello: 'world'}
      .post '/experiments/override',
        {userId: 998, params: {test: 'def', hello: 'two'}}
      .expect 200,
        999: {test: 'abc', hello: 'world'}
        998: {test: 'def', hello: 'two'}
      .post '/experiments', {userId: 999}
      .expect 200, {test: 'abc', hello: 'world'}
      .post '/experiments', {userId: 998}
      .expect 200, {test: 'def', hello: 'two'}
