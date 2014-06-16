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
    "id": "52df3fb0-c868-49c0-8ac6-811209e657a0"
}
```
### get
##### get /api/users/f9f0168c-3465-456c-b18b-ece032841a83
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
    "id": "f9f0168c-3465-456c-b18b-ece032841a83"
}
```
### convert
##### put /api/users/1b542a17-350e-4832-ab38-23a7b688ac47/convert/testing
```js
// req

```
```js
// res
{
    "name": "testing",
    "userId": "1b542a17-350e-4832-ab38-23a7b688ac47",
    "experiments": [
        "expTest"
    ],
    "timestamp": "2014-06-16T06:01:33.591Z"
}
```
#(Admin) User
### set testing group
##### put /api/users/f9f0168c-3465-456c-b18b-ece032841a83/group/same
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
    "id": "f9f0168c-3465-456c-b18b-ece032841a83"
}
```
### remove from experiment
##### delete /api/users/649a3c05-2ae0-4016-a67e-4a67b1c9bdca/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "649a3c05-2ae0-4016-a67e-4a67b1c9bdca",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment
##### put /api/users/649a3c05-2ae0-4016-a67e-4a67b1c9bdca/experiments/expTest
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
    "id": "649a3c05-2ae0-4016-a67e-4a67b1c9bdca",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment, with value
##### put /api/users/649a3c05-2ae0-4016-a67e-4a67b1c9bdca/experiments/expTest/red
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
    "id": "649a3c05-2ae0-4016-a67e-4a67b1c9bdca",
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