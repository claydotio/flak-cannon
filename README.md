# Flak Cannon [![Build Status](https://drone.io/github.com/Zolmeister/flak-cannon/status.png)](https://drone.io/github.com/Zolmeister/flak-cannon/latest)

AB testing framework - server

This is the Flak Cannon API server.  
The web client is found here:  **[flak-cannon-client](https://github.com/claydotio/flak-cannon-client)**

## Install

```sh
$ npm install
```

## Setup

Set the `config.coffee` environment params correctly (requires MongoDB)

```sh
$ npm start
```


## Usage

### Experiments

`/experiments`

#### Creating and Editing an Experiment

Create an experiment in `/experiments` and add it to `/experiments/index.coffee`  
Do not edit running experiments, instead create new ones.

The `assign()` method must be deterministic, parameters must be unique across all experiments

#### Example

```coffee
picker = require 'flak-cannon-picker'

class MyExperiment

  params: ['homepage_button']
  ###*
   * Function to assign experiment params
   * @param {String} userId
   * @returns {Object<String|Number>} parameter assignments
  ###
  assign: (userId) ->
    return {
      homepage_button: picker.uniformChoice(userId, ['a', 'b', 'c'])
    }


module.exports = new MyExperiment()
```

### API

#### `POST /users`

request body can contain metadata for users, and `id` properties will be synced

Response:

```js
{
  id: '123e4567-e89b-12d3-a456-426655440000', // flak cannon id
  params: {
    login_button: 'red'
  }
}
```

#### `GET /users/:id`

Response:

```js
{
  id: '123e4567-e89b-12d3-a456-426655440000', // flak cannon id
  params: {
    login_button: 'red'
  }
}
```

#### `GET /users/params`

Response:

```js
[
  {
    id: 'login_button'
  },
  {
    id: 'another_test_parameter'
  }
]
```

#### `POST /users/:id/convert/:name`

Response

```js
{
  event: 'signup',
  userId: '123e4567-e89b-12d3-a456-426655440000',
  timestamp: 'January 1, 2038',
  params: {
    login_button: 'red'
  }
}
```

#### `GET /conversions`

Response

```js
[
  {
    id: 'signup'
  }
]
```

#### `GET /conversions/:name?param=<param>&from=<Date>&to=<Date>`

Response

```js
{
  views: [
    {
      param: 'red',
      count: 123
    },
    {
      param: 'green',
      count: 113
    }
  ],
  counts: [
    [
      {
        date: 'January 1, 2038',
        value: 'red',
        count: 12
      },
      {
        date: 'January 1, 2038',
        value: 'green',
        count: 12
      },
    ],
    [
      {
        date: 'January 2, 2038',
        value: 'red',
        count: 32
      },
      {
        date: 'January 2, 2038',
        value: 'green',
        count: 22
      },
    ],
    [
      {
        date: 'January 3, 2038',
        value: 'red',
        count: 52
      },
      {
        date: 'January 3, 2038',
        value: 'green',
        count: 22
      },
    ]
  ]
}
```

#### Contributing

Run tests:

```sh
$ npm test
```

Run server in development mode:

```sh
$ npm run dev
```
