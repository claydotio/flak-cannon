# Flak Cannon - 2

## Commands

**Install** `npm install`
**Test** `npm test`
**Run** `npm start`

## Usage

### Experiments

`/experiments`

#### Creating and Editing an Experiment

Create an experiment in `/experiments` and add it to `/experiments/index.js`  
Do not edit running experiments, instead create new ones.

The `assign()` method must be deterministic, parameters must be unique across all app experiments

#### Example

```coffee
pick = require './lib/pick'

module.exports = class MyExperiment
  app: 'MyApp'

  ###*
   * Function to assign experiment params
   * @param {String} userId
   * @returns {Object<String|Number>} parameter assignments
  ###
  assign: (userId) ->
    return {
      homepage_button: pick.uniformChoice(userId, ['a', 'b', 'c'])
    }
```

### API

  - `POST /users`
  - `GET /users/:id`
  - `POST /users/:id/app/:app/convert/:name`
  - `GET /:app/conversions/:name?params=a`
