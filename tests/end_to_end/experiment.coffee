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
