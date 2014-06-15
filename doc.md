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
    "id": "a24d66e2-a93d-45bd-aa20-8d676b17f392"
}
```
### get
##### get /api/users/506d5be8-6f69-488f-9a3f-2cc98cfb40d7
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
    "id": "506d5be8-6f69-488f-9a3f-2cc98cfb40d7"
}
```
### convert
##### put /api/users/325f9c02-58d8-414b-b10d-66b26c4d3f70/convert/testing
```js
// req

```
```js
// res
{
    "name": "testing",
    "userId": "325f9c02-58d8-414b-b10d-66b26c4d3f70",
    "experiments": [],
    "timestamp": "2014-06-15T02:34:39.376Z"
}
```
#(Admin) User
### set testing group
##### put /api/users/506d5be8-6f69-488f-9a3f-2cc98cfb40d7/group/same
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
    "id": "506d5be8-6f69-488f-9a3f-2cc98cfb40d7"
}
```
### remove from experiment
##### delete /api/users/3a88bc34-0b5b-4dd0-8832-8b9e8a6b7a73/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "3a88bc34-0b5b-4dd0-8832-8b9e8a6b7a73",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment
##### put /api/users/3a88bc34-0b5b-4dd0-8832-8b9e8a6b7a73/experiments/expTest
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
    "id": "3a88bc34-0b5b-4dd0-8832-8b9e8a6b7a73",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment, with value
##### put /api/users/3a88bc34-0b5b-4dd0-8832-8b9e8a6b7a73/experiments/expTest/red
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
    "id": "3a88bc34-0b5b-4dd0-8832-8b9e8a6b7a73",
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
##### get /api/experiments/expTest/results
```js
// req

```
```js
// res
[
    {
        "experiments": {
            "expTest": "b"
        },
        "group": "tester",
        "id": "3a88bc34-0b5b-4dd0-8832-8b9e8a6b7a73",
        "info": {
            "ip": "127.0.0.1"
        }
    }
]
```