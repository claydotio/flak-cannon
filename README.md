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
