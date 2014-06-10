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
"{\"group\":\"123\",\"info\":{\"abc\":\"def\"},\"id\":\"874294c7-c350-4168-bf4c-89a830570b14\"}"
```
### convert
##### put /api/users/0e9b1fa0-4639-4ed1-be64-460d6e62633e/convert/testing
```js
// req

```
```js
// res
"{\"conversions\":{\"testing\":1},\"group\":\"123\",\"info\":{\"abc\":\"def\"},\"id\":\"0e9b1fa0-4639-4ed1-be64-460d6e62633e\"}"
```
### set testing group
##### put /api/users/0e9b1fa0-4639-4ed1-be64-460d6e62633e/group/same
```js
// req

```
```js
// res
"{\"conversions\":{\"testing\":1},\"group\":\"same\",\"id\":\"0e9b1fa0-4639-4ed1-be64-460d6e62633e\",\"info\":{\"abc\":\"def\"}}"
```
### remove from experiment
##### delete /api/users/ea61ecb7-cfe5-4d2e-9a69-8da4ec8c2bf5/experiments/expTest
```js
// req

```
```js
// res
"{\"group\":\"tester\",\"id\":\"ea61ecb7-cfe5-4d2e-9a69-8da4ec8c2bf5\"}"
```
### add to experiment
##### put /api/users/ea61ecb7-cfe5-4d2e-9a69-8da4ec8c2bf5/experiments/expTest
```js
// req

```
```js
// res
"{\"experiments\":{\"expTest\":\"c\"},\"group\":\"tester\",\"id\":\"ea61ecb7-cfe5-4d2e-9a69-8da4ec8c2bf5\"}"
```
### add to experiment, with value
##### put /api/users/ea61ecb7-cfe5-4d2e-9a69-8da4ec8c2bf5/experiments/expTest/red
```js
// req

```
```js
// res
"{\"experiments\":{\"expTest\":\"red\"},\"group\":\"tester\",\"id\":\"ea61ecb7-cfe5-4d2e-9a69-8da4ec8c2bf5\"}"
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
"[{\"experiments\":{\"expTest\":\"red\"},\"group\":\"tester\",\"id\":\"ea61ecb7-cfe5-4d2e-9a69-8da4ec8c2bf5\"}]"
```