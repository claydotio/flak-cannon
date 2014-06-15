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
    "id": "31af33b5-70d3-4d6b-a290-ebf5378925ba"
}
```
### get
##### get /api/users/2dd83587-cd94-41bf-8c11-75e2cafff47a
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
    "id": "2dd83587-cd94-41bf-8c11-75e2cafff47a"
}
```
#(Admin) User
### set testing group
##### put /api/users/2dd83587-cd94-41bf-8c11-75e2cafff47a/group/same
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
    "id": "2dd83587-cd94-41bf-8c11-75e2cafff47a"
}
```
### remove from experiment
##### delete /api/users/35c49ce2-e6f4-48fd-875e-eb969ceff0fc/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "35c49ce2-e6f4-48fd-875e-eb969ceff0fc",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment
##### put /api/users/35c49ce2-e6f4-48fd-875e-eb969ceff0fc/experiments/expTest
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
    "id": "35c49ce2-e6f4-48fd-875e-eb969ceff0fc",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment, with value
##### put /api/users/35c49ce2-e6f4-48fd-875e-eb969ceff0fc/experiments/expTest/red
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
    "id": "35c49ce2-e6f4-48fd-875e-eb969ceff0fc",
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
            "expTest": "c"
        },
        "group": "tester",
        "id": "35c49ce2-e6f4-48fd-875e-eb969ceff0fc",
        "info": {
            "ip": "127.0.0.1"
        }
    }
]
```