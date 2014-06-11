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
    "id": "900280fe-c9f1-4bae-b2c7-7aa60bb7230c"
}
```
### get
##### get /api/users/0ddecd97-c5d6-4bf8-8ab7-ddef1eaa4484
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
    "id": "0ddecd97-c5d6-4bf8-8ab7-ddef1eaa4484"
}
```
### convert
##### put /api/users/a56018d5-0bf6-43e6-8c41-4e89e7908d8a/convert/testing
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
    "id": "a56018d5-0bf6-43e6-8c41-4e89e7908d8a"
}
```
### set testing group
##### put /api/users/a56018d5-0bf6-43e6-8c41-4e89e7908d8a/group/same
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
    "id": "a56018d5-0bf6-43e6-8c41-4e89e7908d8a",
    "info": {
        "abc": "def"
    }
}
```
### remove from experiment
##### delete /api/users/e5d25a58-a16d-4ac0-aaba-19bb0a8920e2/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "e5d25a58-a16d-4ac0-aaba-19bb0a8920e2",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment
##### put /api/users/e5d25a58-a16d-4ac0-aaba-19bb0a8920e2/experiments/expTest
```js
// req

```
```js
// res
{
    "experiments": {
        "expTest": "c"
    },
    "group": "tester",
    "id": "e5d25a58-a16d-4ac0-aaba-19bb0a8920e2",
    "info": {
        "ip": "127.0.0.1"
    }
}
```
### add to experiment, with value
##### put /api/users/e5d25a58-a16d-4ac0-aaba-19bb0a8920e2/experiments/expTest/red
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
    "id": "e5d25a58-a16d-4ac0-aaba-19bb0a8920e2",
    "info": {
        "ip": "127.0.0.1"
    }
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
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "bbe70851-43d4-4910-8e79-406dcb646147"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "7f72bc4e-220f-457e-95dc-474873e321e8"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "52055d48-d10d-49ad-a393-6deec035ef94"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "f8386a5f-abdd-4567-95e3-78c1ddb0799d"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "e15bc888-8a10-4ad2-adec-dbab06d97d9c"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "b457bce7-a5cb-42c4-bf10-ce298243dc9a"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "d192711f-a72b-41e9-8da4-4cd4e1bbc5cf"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "5524eaba-c82a-48a4-97e9-d8b14c069530"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "d0526edf-88ef-4c67-ac8b-70e8da45274b"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "e25786d7-b69c-4ef4-adca-5e53bb6ba1cf"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "1648b32b-83ac-4410-8c0e-a16c04aae77d"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "1b46060d-c383-4fca-880f-5af1eda5a3db"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "395b176c-6185-4090-bdeb-fa9cf8cf1f77"
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "c7296a93-39b3-400a-bdea-fbd5a4de6716",
        "info": {
            "ip": "127.0.0.1"
        }
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "883ca769-ed5b-4898-9391-c237b6256345",
        "info": {
            "ip": "127.0.0.1"
        }
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "6b550183-10e3-4ff9-8f26-8de207f5237b",
        "info": {
            "ip": "127.0.0.1"
        }
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "50e89618-fcb3-4375-a96e-4a6a44767948",
        "info": {
            "ip": "127.0.0.1"
        }
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "6c20b46a-4dd3-4f9c-bef1-e4ac5613c3e6",
        "info": {
            "ip": "127.0.0.1"
        }
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "603d821a-51c4-4633-96aa-b93266b9e32a",
        "info": {
            "ip": "127.0.0.1"
        }
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "f3c3f2aa-3d91-489d-aee3-2c5e529eca79",
        "info": {
            "ip": "127.0.0.1"
        }
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "43b1bc18-2040-4c5e-98ed-dd4716034924",
        "info": {
            "ip": "127.0.0.1"
        }
    },
    {
        "experiments": {
            "expTest": "red"
        },
        "group": "tester",
        "id": "e5d25a58-a16d-4ac0-aaba-19bb0a8920e2",
        "info": {
            "ip": "127.0.0.1"
        }
    }
]
```