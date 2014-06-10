### API
##### new user
post `/user`
```js
{
  // optional, subsequent posts with the
  // same `group` will be placed in the same test groups
  group: '123',
  info: {
    ip: '1.2.3.4',
    platform: 'android',
    device: 'mobile'
  }
}
```

get `/user/:id`
```js
{
  id: 'abc-def-hij-klm',
  group: '123',
  info: {
    ip: '1.2.3.4',
    platform: 'android',
    device: 'mobile'
    ...
  },
  experiments: {
    'button_color': 'red'
  },
  conversions: {
    'button_color_click': 2,
    'shop_buy': 5
  }
}
```

put, del `/user/:id/experiments/:name/(:value)`
put `/user/:id/convert/:name` // +1

##### new experiement
post `/experiment`
```js
{
  name: 'exp_name',
  values: ['red', 'green', 'blue'],
  weights: [0.5, 0.1, 0.4], // [NOT IMPLEMENTED] optional custom weights
  where: { // [NOT IMPLEMENTED] optional filter
    device: 'android'
  }
}
```
patch, del `/experiments/:name` // [NOT IMPLEMENTED]


##### results

get `/experiments/:name/results`
```js
// A bit jank, and slow. This should probably have some query options
[
  <user>
]
```



Purpose:
Identify our needs from a testing tool to determine best framework/in-house/hybrid system to meet our needs

Use Cases:
- Need to decide between two button styles/colors
  - Show both button colors to users and see which one gets more clicks
    - issue: Another button now gets less clicks
    - issue: What does an anonymous user see? (and maintain consistency)
- Redesign landing page / comparing multiple versions of single feature
  - Show both landing pages / features and see which one gets a better KPI score
  - Only show to new users
    - issue: Maintain consistency for anonymous users?
    - issue: how to calculate KPI score?
- New feature release
  - Only show new feature for a percentage of users
  - increase to 100% users over time
    - issue: overlapping with other tests skews their results
    - issue: the feature (like chat) may require both parties to be in the testing group
- Need to decide between three button colors
  - Show all three colors to users (heavily weighted towards the control)
    - <see two button colors>

Notes
- Should be separated by environment - a feature being tested on mobile is going to have different results from the tablet/desktop counterpart
- Test may do well on mobile, poorly on tablet/desktop
- It would be ideal if devs can take advantage of this framework through the API
Since it’s RESTful, that should be easy - should be able to easily tack on a couple of JS API calls
