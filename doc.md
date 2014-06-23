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
    "id": "3b601e3f-6ed0-4496-9c2c-1bda3e61f90a"
}
```
### get
##### get /api/users/8eaf13c1-a0e4-4f91-8d38-77afd3b172b8
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
    "id": "8eaf13c1-a0e4-4f91-8d38-77afd3b172b8"
}
```
### convert
##### put /api/users/95fa8f9a-270a-4c2a-95de-4641c6ec2830/convert/testing
```js
// req

```
```js
// res
{
    "name": "testing",
    "userId": "95fa8f9a-270a-4c2a-95de-4641c6ec2830",
    "experiments": {
        "convertible": "a",
        "expTest": "green"
    },
    "timestamp": "2014-06-22T23:39:54.263Z"
}
```
#(Admin) User
### set testing group
##### put /api/users/8eaf13c1-a0e4-4f91-8d38-77afd3b172b8/group/same
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
    "id": "8eaf13c1-a0e4-4f91-8d38-77afd3b172b8"
}
```
### remove from experiment
##### delete /api/users/51178651-ec8e-4b85-a61b-098852660856/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "51178651-ec8e-4b85-a61b-098852660856",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment
##### put /api/users/51178651-ec8e-4b85-a61b-098852660856/experiments/expTest
```js
// req

```
```js
// res
{
    "experiments": {
        "expTest": "e"
    },
    "group": "tester",
    "id": "51178651-ec8e-4b85-a61b-098852660856",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment, with value
##### put /api/users/51178651-ec8e-4b85-a61b-098852660856/experiments/expTest/red
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
    "id": "51178651-ec8e-4b85-a61b-098852660856",
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
            "test": "a",
            "conversionCount": 1,
            "splits": {
                "Platform": "Apple Mac",
                "Browser": "Chrome"
            }
        },
        "b:Linux:Chrome": {
            "test": "b",
            "conversionCount": 2,
            "splits": {
                "Platform": "Linux",
                "Browser": "Chrome"
            }
        },
        "a:Linux:Chrome": {
            "test": "a",
            "conversionCount": 2,
            "splits": {
                "Platform": "Linux",
                "Browser": "Chrome"
            }
        }
    },
    {
        "a:Apple Mac:Chrome": {
            "test": "a",
            "conversionCount": 1,
            "splits": {
                "Platform": "Apple Mac",
                "Browser": "Chrome"
            }
        },
        "b:Linux:Chrome": {
            "test": "b",
            "conversionCount": 1,
            "splits": {
                "Platform": "Linux",
                "Browser": "Chrome"
            }
        }
    },
    {
        "a:Apple Mac:Chrome": {
            "test": "a",
            "conversionCount": 2,
            "splits": {
                "Platform": "Apple Mac",
                "Browser": "Chrome"
            }
        },
        "b:Linux:Chrome": {
            "test": "b",
            "conversionCount": 1,
            "splits": {
                "Platform": "Linux",
                "Browser": "Chrome"
            }
        },
        "a:Linux:Chrome": {
            "test": "a",
            "conversionCount": 1,
            "splits": {
                "Platform": "Linux",
                "Browser": "Chrome"
            }
        }
    }
]
```