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
    "id": "597b6af0-be16-499c-b442-b80a9cffcc71"
}
```
### get
##### get /api/users/716e762f-c640-4316-a571-0981617b2c11
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
    "id": "716e762f-c640-4316-a571-0981617b2c11"
}
```
### convert
##### put /api/users/0d291b14-60b3-4a51-b39b-38fa7a246621/convert/testing
```js
// req

```
```js
// res
{
    "name": "testing",
    "userId": "0d291b14-60b3-4a51-b39b-38fa7a246621",
    "experiments": {
        "convertible": "b",
        "expTest": "red"
    },
    "timestamp": "2014-07-05T00:52:22.829Z"
}
```
#(Admin) User
### set testing group
##### put /api/users/716e762f-c640-4316-a571-0981617b2c11/group/same
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
    "id": "716e762f-c640-4316-a571-0981617b2c11"
}
```
### remove from experiment
##### delete /api/users/78e1a0d2-9196-4356-8df6-106729cc996d/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "78e1a0d2-9196-4356-8df6-106729cc996d",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment
##### put /api/users/78e1a0d2-9196-4356-8df6-106729cc996d/experiments/expTest
```js
// req

```
```js
// res
{
    "experiments": {
        "expTest": "d"
    },
    "group": "tester",
    "id": "78e1a0d2-9196-4356-8df6-106729cc996d",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment, with value
##### put /api/users/78e1a0d2-9196-4356-8df6-106729cc996d/experiments/expTest/red
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
    "id": "78e1a0d2-9196-4356-8df6-106729cc996d",
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
### get
##### get /api/experiments
```js
// req

```
```js
// res
[
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
]
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
            "Platform": "Linux",
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
            "Platform": "Apple Mac",
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