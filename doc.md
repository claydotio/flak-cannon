#User
### create
##### post /api/users
```js
// req
{}
```
```js
// res
{
    "id": "06aaa8f2-d3de-419e-be42-b6f8bd0a46ab"
}
```
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
    "id": "e08bab93-74e6-45c6-aa1f-7f002ce12f08"
}
```
### get
##### get /api/users/874294c7-c350-4168-bf4c-89a830570b14
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
    "id": "874294c7-c350-4168-bf4c-89a830570b14"
}
```
### convert
##### put /api/users/0e9b1fa0-4639-4ed1-be64-460d6e62633e/convert/testing
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
    "id": "0e9b1fa0-4639-4ed1-be64-460d6e62633e"
}
```
### set testing group
##### put /api/users/0e9b1fa0-4639-4ed1-be64-460d6e62633e/group/same
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
    "id": "0e9b1fa0-4639-4ed1-be64-460d6e62633e",
    "info": {
        "abc": "def"
    }
}
```
### remove from experiment
##### delete /api/users/ea61ecb7-cfe5-4d2e-9a69-8da4ec8c2bf5/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "ea61ecb7-cfe5-4d2e-9a69-8da4ec8c2bf5"
}
```
### add to experiment
##### put /api/users/ea61ecb7-cfe5-4d2e-9a69-8da4ec8c2bf5/experiments/expTest
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
    "id": "ea61ecb7-cfe5-4d2e-9a69-8da4ec8c2bf5"
}
```
### add to experiment, with value
##### put /api/users/ea61ecb7-cfe5-4d2e-9a69-8da4ec8c2bf5/experiments/expTest/red
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
    "id": "ea61ecb7-cfe5-4d2e-9a69-8da4ec8c2bf5"
}
```
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
    "id": "644f10da-6999-4cca-8de3-6b6b17d56c8a"
}
```
### get
##### get /api/users/fc546ac6-2e40-4b19-b020-e780af0fd48e
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
    "id": "fc546ac6-2e40-4b19-b020-e780af0fd48e"
}
```
### convert
##### put /api/users/65d356b9-2e05-4fa2-beec-df518af86fa4/convert/testing
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
    "id": "65d356b9-2e05-4fa2-beec-df518af86fa4"
}
```
### set testing group
##### put /api/users/65d356b9-2e05-4fa2-beec-df518af86fa4/group/same
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
    "id": "65d356b9-2e05-4fa2-beec-df518af86fa4",
    "info": {
        "abc": "def"
    }
}
```
### remove from experiment
##### delete /api/users/4ea5e1bd-ceca-4996-a032-3b1b42051e8a/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "4ea5e1bd-ceca-4996-a032-3b1b42051e8a"
}
```
### add to experiment
##### put /api/users/4ea5e1bd-ceca-4996-a032-3b1b42051e8a/experiments/expTest
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
    "id": "4ea5e1bd-ceca-4996-a032-3b1b42051e8a"
}
```
### add to experiment, with value
##### put /api/users/4ea5e1bd-ceca-4996-a032-3b1b42051e8a/experiments/expTest/red
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
    "id": "4ea5e1bd-ceca-4996-a032-3b1b42051e8a"
}
```
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
    "id": "fd289db7-0eec-47af-9d89-d976362d3ff7"
}
```
### get
##### get /api/users/c14e4484-be7c-44da-b1e5-1c76c8c932d1
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
    "id": "c14e4484-be7c-44da-b1e5-1c76c8c932d1"
}
```
### convert
##### put /api/users/afc2184d-bc05-4495-8c34-cdcc3c9c45e6/convert/testing
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
    "id": "afc2184d-bc05-4495-8c34-cdcc3c9c45e6"
}
```
### set testing group
##### put /api/users/afc2184d-bc05-4495-8c34-cdcc3c9c45e6/group/same
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
    "id": "afc2184d-bc05-4495-8c34-cdcc3c9c45e6",
    "info": {
        "abc": "def"
    }
}
```
### remove from experiment
##### delete /api/users/f4dcc591-bdc5-4c1f-a7da-1b38cf216994/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "f4dcc591-bdc5-4c1f-a7da-1b38cf216994"
}
```
### add to experiment
##### put /api/users/f4dcc591-bdc5-4c1f-a7da-1b38cf216994/experiments/expTest
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
    "id": "f4dcc591-bdc5-4c1f-a7da-1b38cf216994"
}
```
### add to experiment, with value
##### put /api/users/f4dcc591-bdc5-4c1f-a7da-1b38cf216994/experiments/expTest/red
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
    "id": "f4dcc591-bdc5-4c1f-a7da-1b38cf216994"
}
```
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
    "id": "a80be4bb-e10c-4806-b427-603b82db5ff9"
}
```
### get
##### get /api/users/42a72368-6829-4fe5-8502-53720eac4051
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
    "id": "42a72368-6829-4fe5-8502-53720eac4051"
}
```
### convert
##### put /api/users/8d28322e-03d5-4467-ae59-71b7a7f5c087/convert/testing
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
    "id": "8d28322e-03d5-4467-ae59-71b7a7f5c087"
}
```
### set testing group
##### put /api/users/8d28322e-03d5-4467-ae59-71b7a7f5c087/group/same
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
    "id": "8d28322e-03d5-4467-ae59-71b7a7f5c087",
    "info": {
        "abc": "def"
    }
}
```
### remove from experiment
##### delete /api/users/6229f149-7f1e-4089-8d2e-5ef89117fd36/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "6229f149-7f1e-4089-8d2e-5ef89117fd36"
}
```
### add to experiment
##### put /api/users/6229f149-7f1e-4089-8d2e-5ef89117fd36/experiments/expTest
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
    "id": "6229f149-7f1e-4089-8d2e-5ef89117fd36"
}
```
### add to experiment, with value
##### put /api/users/6229f149-7f1e-4089-8d2e-5ef89117fd36/experiments/expTest/red
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
    "id": "6229f149-7f1e-4089-8d2e-5ef89117fd36"
}
```
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
    "id": "c86e3fbc-ff24-4bdf-af29-06c2ef69e0fd"
}
```
### get
##### get /api/users/d99ee5fb-7c9a-45a4-a47c-0888278e0ffa
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
    "id": "d99ee5fb-7c9a-45a4-a47c-0888278e0ffa"
}
```
### convert
##### put /api/users/a79bab94-b3b9-48c8-80bd-446c8b6aa109/convert/testing
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
    "id": "a79bab94-b3b9-48c8-80bd-446c8b6aa109"
}
```
### set testing group
##### put /api/users/a79bab94-b3b9-48c8-80bd-446c8b6aa109/group/same
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
    "id": "a79bab94-b3b9-48c8-80bd-446c8b6aa109",
    "info": {
        "abc": "def"
    }
}
```
### remove from experiment
##### delete /api/users/38bc528e-0041-4576-9810-4f8c5e9c635a/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "38bc528e-0041-4576-9810-4f8c5e9c635a"
}
```
### add to experiment
##### put /api/users/38bc528e-0041-4576-9810-4f8c5e9c635a/experiments/expTest
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
    "id": "38bc528e-0041-4576-9810-4f8c5e9c635a"
}
```
### add to experiment, with value
##### put /api/users/38bc528e-0041-4576-9810-4f8c5e9c635a/experiments/expTest/red
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
    "id": "38bc528e-0041-4576-9810-4f8c5e9c635a"
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
        "id": "ea61ecb7-cfe5-4d2e-9a69-8da4ec8c2bf5"
    }
]
```
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
            "expTest": "green"
        },
        "group": "tester",
        "id": "4ea5e1bd-ceca-4996-a032-3b1b42051e8a"
    }
]
```
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
        "id": "f4dcc591-bdc5-4c1f-a7da-1b38cf216994"
    }
]
```
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
            "expTest": "blue"
        },
        "group": "tester",
        "id": "6229f149-7f1e-4089-8d2e-5ef89117fd36"
    }
]
```
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
    }
]
```