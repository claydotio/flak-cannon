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
    "id": "b9244bd8-bf7b-4a53-ab79-6b480a53725a"
}
```
### get
##### get /api/users/ddc816f7-0759-493e-900f-e8856c12f085
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
    "id": "ddc816f7-0759-493e-900f-e8856c12f085"
}
```
### convert
##### put /api/users/a2070a8f-8ed4-459b-8dd7-57d2ccab28e0/convert/testing
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
    "id": "a2070a8f-8ed4-459b-8dd7-57d2ccab28e0"
}
```
### set testing group
##### put /api/users/a2070a8f-8ed4-459b-8dd7-57d2ccab28e0/group/same
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
    "id": "a2070a8f-8ed4-459b-8dd7-57d2ccab28e0",
    "info": {
        "abc": "def"
    }
}
```
### remove from experiment
##### delete /api/users/3c5f5bb6-c8bb-4082-b0c7-0b9d4ceeb5a7/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "3c5f5bb6-c8bb-4082-b0c7-0b9d4ceeb5a7"
}
```
### add to experiment
##### put /api/users/3c5f5bb6-c8bb-4082-b0c7-0b9d4ceeb5a7/experiments/expTest
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
    "id": "3c5f5bb6-c8bb-4082-b0c7-0b9d4ceeb5a7"
}
```
### add to experiment, with value
##### put /api/users/3c5f5bb6-c8bb-4082-b0c7-0b9d4ceeb5a7/experiments/expTest/red
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
    "id": "3c5f5bb6-c8bb-4082-b0c7-0b9d4ceeb5a7"
}
```
#Experiment
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
            "expTest": "red"
        },
        "group": "tester",
        "id": "38bc528e-0041-4576-9810-4f8c5e9c635a"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "a75134bb-841a-4f01-bb7b-8ffc25758375"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "6ca68527-ae58-4533-8322-33df2a527bae"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "f023d206-ddf9-4720-b9ba-250c93f22662"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "99d32c84-5d5b-45ed-84bd-a96d5910f935"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "a13cbcb6-6071-4b11-b29b-984d2f0b1631"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "6c1fa6e6-a504-43f0-90c0-435e4733933f"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "c68da7e4-beda-4775-8d4e-3172eff5c373"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "3c5f5bb6-c8bb-4082-b0c7-0b9d4ceeb5a7"
    }
]
```