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
    "id": "2e803219-68c0-4ef4-9a77-b829e976eb35"
}
```
### get
##### get /api/users/fc27f291-d889-4b44-aefe-664351c86473
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
    "id": "fc27f291-d889-4b44-aefe-664351c86473"
}
```
### convert
##### put /api/users/3fed8064-a238-4bef-9a7e-130edfb2f74f/convert/testing
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
    "id": "3fed8064-a238-4bef-9a7e-130edfb2f74f"
}
```
#(Admin) User
### set testing group
##### put /api/users/3fed8064-a238-4bef-9a7e-130edfb2f74f/group/same
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
    "id": "3fed8064-a238-4bef-9a7e-130edfb2f74f",
    "info": {
        "abc": "def"
    }
}
```
### remove from experiment
##### delete /api/users/740bd152-8318-4e35-84ee-8a398f09272d/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "740bd152-8318-4e35-84ee-8a398f09272d",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment
##### put /api/users/740bd152-8318-4e35-84ee-8a398f09272d/experiments/expTest
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
    "id": "740bd152-8318-4e35-84ee-8a398f09272d",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment, with value
##### put /api/users/740bd152-8318-4e35-84ee-8a398f09272d/experiments/expTest/red
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
    "id": "740bd152-8318-4e35-84ee-8a398f09272d",
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
        "id": "740bd152-8318-4e35-84ee-8a398f09272d",
        "info": {
            "ip": "127.0.0.1"
        }
    }
]
```