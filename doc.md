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
    "id": "b99694eb-bafe-4fd9-9692-5ed6a5d4e5b4"
}
```
### get
##### get /api/users/b8d56f4e-38fb-45d6-bd83-22900065ebda
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
    "id": "b8d56f4e-38fb-45d6-bd83-22900065ebda"
}
```
### convert
##### put /api/users/b27d544b-ce18-4dda-8cf5-f30428321d43/convert/testing
```js
// req

```
```js
// res
{
    "name": "testing",
    "userId": "b27d544b-ce18-4dda-8cf5-f30428321d43",
    "experiments": {
        "convertible": "a",
        "expTest": "b"
    },
    "timestamp": "2014-06-23T00:39:04.476Z"
}
```
#(Admin) User
### set testing group
##### put /api/users/b8d56f4e-38fb-45d6-bd83-22900065ebda/group/same
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
    "id": "b8d56f4e-38fb-45d6-bd83-22900065ebda"
}
```
### remove from experiment
##### delete /api/users/f227a18f-b461-4e9c-8814-1193143d8bac/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "f227a18f-b461-4e9c-8814-1193143d8bac",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment
##### put /api/users/f227a18f-b461-4e9c-8814-1193143d8bac/experiments/expTest
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
    "id": "f227a18f-b461-4e9c-8814-1193143d8bac",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment, with value
##### put /api/users/f227a18f-b461-4e9c-8814-1193143d8bac/experiments/expTest/red
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
    "id": "f227a18f-b461-4e9c-8814-1193143d8bac",
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