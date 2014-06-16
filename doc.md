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
    "id": "ae92cbe4-a416-492d-a673-33c151fede44"
}
```
### get
##### get /api/users/b18c16c2-78ac-4084-a81a-9013726220de
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
    "id": "b18c16c2-78ac-4084-a81a-9013726220de"
}
```
### convert
##### put /api/users/2a08d8ee-16a3-4a72-a3fd-28a400e2b244/convert/testing
```js
// req

```
```js
// res
{
    "name": "testing",
    "userId": "2a08d8ee-16a3-4a72-a3fd-28a400e2b244",
    "experiments": {
        "convertible": "a",
        "expTest": "f"
    },
    "timestamp": "2014-06-16T08:11:04.737Z"
}
```
#(Admin) User
### set testing group
##### put /api/users/b18c16c2-78ac-4084-a81a-9013726220de/group/same
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
    "id": "b18c16c2-78ac-4084-a81a-9013726220de"
}
```
### remove from experiment
##### delete /api/users/224743c8-a0a6-4135-8cbe-b4f4f5d6cc49/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "224743c8-a0a6-4135-8cbe-b4f4f5d6cc49",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment
##### put /api/users/224743c8-a0a6-4135-8cbe-b4f4f5d6cc49/experiments/expTest
```js
// req

```
```js
// res
{
    "experiments": {
        "expTest": "f"
    },
    "group": "tester",
    "id": "224743c8-a0a6-4135-8cbe-b4f4f5d6cc49",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment, with value
##### put /api/users/224743c8-a0a6-4135-8cbe-b4f4f5d6cc49/experiments/expTest/red
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
    "id": "224743c8-a0a6-4135-8cbe-b4f4f5d6cc49",
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
        "a": {
            "Linux,Chrome": 1,
            "Apple Mac,Chrome": 2
        },
        "b": {
            "Linux,Chrome": 2
        }
    },
    {
        "a": {
            "Linux,Chrome": 1
        },
        "b": {
            "Linux,Chrome": 1
        }
    },
    {
        "a": {
            "Linux,Chrome": 2,
            "Apple Mac,Chrome": 1
        },
        "b": {
            "Linux,Chrome": 1
        }
    }
]
```