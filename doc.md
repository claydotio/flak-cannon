#User
### create
##### post /api/users
```js
// req
{
    "info": {
        "abc": "def"
    }
}
```
```js
// res
{
    "info": {
        "abc": "def"
    },
    "id": "1e291494-f051-4042-9e1c-d81d581dcd85"
}
```
### get
##### get /api/users/034d8ea1-eee8-4d11-ad3d-90c2634a6769
```js
// req

```
```js
// res
{
    "group": "123",
    "info": {
        "abc": "def"
    },
    "id": "034d8ea1-eee8-4d11-ad3d-90c2634a6769"
}
```
### convert
##### put /api/users/5a59358a-2c6a-4050-a585-a2b6d5cc0db8/convert/testing
```js
// req

```
```js
// res
{
    "name": "testing",
    "userId": "5a59358a-2c6a-4050-a585-a2b6d5cc0db8",
    "experiments": {
        "convertible": "a",
        "expTest": "green"
    },
    "timestamp": "2014-06-23T05:07:02.487Z"
}
```
#(Admin) User
### set testing group
##### put /api/users/034d8ea1-eee8-4d11-ad3d-90c2634a6769/group/same
```js
// req

```
```js
// res
{
    "group": "same",
    "info": {
        "abc": "def"
    },
    "id": "034d8ea1-eee8-4d11-ad3d-90c2634a6769"
}
```
### remove from experiment
##### delete /api/users/8f620b56-3c3a-4a4f-88e7-a454115e7722/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "8f620b56-3c3a-4a4f-88e7-a454115e7722",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment
##### put /api/users/8f620b56-3c3a-4a4f-88e7-a454115e7722/experiments/expTest
```js
// req

```
```js
// res
{
    "experiments": {
        "expTest": "c"
    },
    "group": "tester",
    "id": "8f620b56-3c3a-4a4f-88e7-a454115e7722",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment, with value
##### put /api/users/8f620b56-3c3a-4a4f-88e7-a454115e7722/experiments/expTest/red
```js
// req

```
```js
// res
{
    "experiments": {
        "expTest": "red"
    },
    "group": "tester",
    "id": "8f620b56-3c3a-4a4f-88e7-a454115e7722",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
#(Admin) Experiment
### create
##### post /api/experiments
```js
// req
{
    "name": "expTest",
    "values": [
        "red",
        "green",
        "blue",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f"
    ]
}
```
```js
// res
{
    "name": "expTest",
    "values": [
        "red",
        "green",
        "blue",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f"
    ]
}
```
### remove
##### delete /api/experiments/expTest
```js
// req

```
```js
// res
{
    "success": true
}
```
### results
##### get /api/experiments/dingdong/results?from=1/1/14&to=1/3/14&split=Platform,Browser&conversion=ding
```js
// req

```
```js
// res
[
    {
        "test": "a",
        "splits": {
            "Platform": "Apple Mac",
            "Browser": "Chrome"
        },
        "data": [
            {
                "count": 1,
                "timestamp": "2014-01-01T08:00:00.000Z"
            },
            {
                "count": 1,
                "timestamp": "2014-01-02T08:00:00.000Z"
            },
            {
                "count": 2,
                "timestamp": "2014-01-03T08:00:00.000Z"
            }
        ]
    },
    {
        "test": "b",
        "splits": {
            "Platform": "Linux",
            "Browser": "Chrome"
        },
        "data": [
            {
                "count": 2,
                "timestamp": "2014-01-01T08:00:00.000Z"
            },
            {
                "count": 1,
                "timestamp": "2014-01-02T08:00:00.000Z"
            },
            {
                "count": 1,
                "timestamp": "2014-01-03T08:00:00.000Z"
            }
        ]
    },
    {
        "test": "a",
        "splits": {
            "Platform": "Linux",
            "Browser": "Chrome"
        },
        "data": [
            {
                "count": 2,
                "timestamp": "2014-01-01T08:00:00.000Z"
            },
            {
                "count": 1,
                "timestamp": "2014-01-03T08:00:00.000Z"
            }
        ]
    }
]
```