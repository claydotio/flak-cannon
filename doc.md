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
    "id": "3c687383-e7cf-4535-99a9-1f90de4dd284"
}
```
### get
##### get /api/users/29313c31-7f94-4096-8a36-0a76a49b6424
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
    "id": "29313c31-7f94-4096-8a36-0a76a49b6424"
}
```
### convert
##### put /api/users/023177ed-b9a3-49dc-9234-af56efbdc583/convert/testing
```js
// req

```
```js
// res
{
    "conversions": {
        "testing": 1
    },
    "group": "123",
    "info": {
        "abc": "def"
    },
    "id": "023177ed-b9a3-49dc-9234-af56efbdc583"
}
```
#(Admin) User
### set testing group
##### put /api/users/023177ed-b9a3-49dc-9234-af56efbdc583/group/same
```js
// req

```
```js
// res
{
    "conversions": {
        "testing": 1
    },
    "group": "same",
    "id": "023177ed-b9a3-49dc-9234-af56efbdc583",
    "info": {
        "abc": "def"
    }
}
```
### remove from experiment
##### delete /api/users/17a6b8ef-bdd4-4a8a-a2fe-24cc9fae92d0/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "17a6b8ef-bdd4-4a8a-a2fe-24cc9fae92d0",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment
##### put /api/users/17a6b8ef-bdd4-4a8a-a2fe-24cc9fae92d0/experiments/expTest
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
    "id": "17a6b8ef-bdd4-4a8a-a2fe-24cc9fae92d0",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment, with value
##### put /api/users/17a6b8ef-bdd4-4a8a-a2fe-24cc9fae92d0/experiments/expTest/red
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
    "id": "17a6b8ef-bdd4-4a8a-a2fe-24cc9fae92d0",
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
            "expTest": "a"
        },
        "group": "tester",
        "id": "17a6b8ef-bdd4-4a8a-a2fe-24cc9fae92d0",
        "info": {
            "ip": "127.0.0.1"
        }
    }
]
```