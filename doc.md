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
    "id": "cdec4e22-061b-4b3d-8890-691adb8a00fa"
}
```
### get
##### get /api/users/af709f07-f07e-403d-8a2f-0119de030458
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
    "id": "af709f07-f07e-403d-8a2f-0119de030458"
}
```
### convert
##### put /api/users/9fe81b0f-9138-4b94-944d-df2f4a958f22/convert/testing
```js
// req

```
```js
// res
{
    "name": "testing",
    "userId": "9fe81b0f-9138-4b94-944d-df2f4a958f22",
    "experiments": {
        "convertible": "b",
        "expTest": "red"
    },
    "timestamp": "2014-07-07T04:11:33.813Z"
}
```
#(Admin) User
### set testing group
##### put /api/users/af709f07-f07e-403d-8a2f-0119de030458/group/same
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
    "id": "af709f07-f07e-403d-8a2f-0119de030458"
}
```
### remove from experiment
##### delete /api/users/45a067b6-6a18-41b4-b37a-6085c332edad/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "45a067b6-6a18-41b4-b37a-6085c332edad",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment
##### put /api/users/45a067b6-6a18-41b4-b37a-6085c332edad/experiments/expTest
```js
// req

```
```js
// res
{
    "experiments": {
        "expTest": "b"
    },
    "group": "tester",
    "id": "45a067b6-6a18-41b4-b37a-6085c332edad",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment, with value
##### put /api/users/45a067b6-6a18-41b4-b37a-6085c332edad/experiments/expTest/red
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
    "id": "45a067b6-6a18-41b4-b37a-6085c332edad",
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