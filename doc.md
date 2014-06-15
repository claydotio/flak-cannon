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
    "id": "fa10bfaf-d7a3-4cfb-858c-f0477d74f0d7"
}
```
### get
##### get /api/users/f495489e-b115-4c84-a9ff-aeffd07192f0
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
    "id": "f495489e-b115-4c84-a9ff-aeffd07192f0"
}
```
#(Admin) User
### set testing group
##### put /api/users/f495489e-b115-4c84-a9ff-aeffd07192f0/group/same
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
    "id": "f495489e-b115-4c84-a9ff-aeffd07192f0"
}
```
### remove from experiment
##### delete /api/users/79417059-437c-40dd-8833-be8ef0b74979/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "79417059-437c-40dd-8833-be8ef0b74979",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment
##### put /api/users/79417059-437c-40dd-8833-be8ef0b74979/experiments/expTest
```js
// req

```
```js
// res
{
    "experiments": {
        "expTest": "blue"
    },
    "group": "tester",
    "id": "79417059-437c-40dd-8833-be8ef0b74979",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment, with value
##### put /api/users/79417059-437c-40dd-8833-be8ef0b74979/experiments/expTest/red
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
    "id": "79417059-437c-40dd-8833-be8ef0b74979",
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
            "expTest": "d"
        },
        "group": "tester",
        "id": "79417059-437c-40dd-8833-be8ef0b74979",
        "info": {
            "ip": "127.0.0.1"
        }
    }
]
```