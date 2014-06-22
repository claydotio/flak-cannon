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
    "id": "07c3ca65-26ee-4f67-aee6-dc4139d4ec26"
}
```
### get
##### get /api/users/eb1ff042-29b0-45b9-af9a-8c3fc70d55f4
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
    "id": "eb1ff042-29b0-45b9-af9a-8c3fc70d55f4"
}
```
### convert
##### put /api/users/0370cfe5-723f-45b0-bbe2-c7dbbf36b51a/convert/testing
```js
// req

```
```js
// res
{
    "name": "testing",
    "userId": "0370cfe5-723f-45b0-bbe2-c7dbbf36b51a",
    "experiments": {
        "convertible": "a",
        "expTest": "green"
    },
    "timestamp": "2014-06-22T22:26:58.510Z"
}
```
#(Admin) User
### set testing group
##### put /api/users/eb1ff042-29b0-45b9-af9a-8c3fc70d55f4/group/same
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
    "id": "eb1ff042-29b0-45b9-af9a-8c3fc70d55f4"
}
```
### remove from experiment
##### delete /api/users/2454602b-dd5d-4c6c-aa3b-84232896e9b2/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "2454602b-dd5d-4c6c-aa3b-84232896e9b2",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment
##### put /api/users/2454602b-dd5d-4c6c-aa3b-84232896e9b2/experiments/expTest
```js
// req

```
```js
// res
{
    "experiments": {
        "expTest": "a"
    },
    "group": "tester",
    "id": "2454602b-dd5d-4c6c-aa3b-84232896e9b2",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment, with value
##### put /api/users/2454602b-dd5d-4c6c-aa3b-84232896e9b2/experiments/expTest/red
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
    "id": "2454602b-dd5d-4c6c-aa3b-84232896e9b2",
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
        "a:Apple Mac:Chrome": {
            "conversionCount": 1,
            "splits": {
                "Platform": "Apple Mac",
                "Browser": "Chrome"
            }
        },
        "b:Linux:Chrome": {
            "conversionCount": 2,
            "splits": {
                "Platform": "Linux",
                "Browser": "Chrome"
            }
        },
        "a:Linux:Chrome": {
            "conversionCount": 2,
            "splits": {
                "Platform": "Linux",
                "Browser": "Chrome"
            }
        }
    },
    {
        "a:Apple Mac:Chrome": {
            "conversionCount": 1,
            "splits": {
                "Platform": "Apple Mac",
                "Browser": "Chrome"
            }
        },
        "b:Linux:Chrome": {
            "conversionCount": 1,
            "splits": {
                "Platform": "Linux",
                "Browser": "Chrome"
            }
        }
    },
    {
        "a:Apple Mac:Chrome": {
            "conversionCount": 2,
            "splits": {
                "Platform": "Apple Mac",
                "Browser": "Chrome"
            }
        },
        "b:Linux:Chrome": {
            "conversionCount": 1,
            "splits": {
                "Platform": "Linux",
                "Browser": "Chrome"
            }
        },
        "a:Linux:Chrome": {
            "conversionCount": 1,
            "splits": {
                "Platform": "Linux",
                "Browser": "Chrome"
            }
        }
    }
]
```