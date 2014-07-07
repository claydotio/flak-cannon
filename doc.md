#User
### create
##### post /api/testapp/users
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
    "id": "9f4cf8f1-081d-4e6a-907e-f23696800f5a",
    "namespace": "testapp"
}
```
### get
##### get /api/testapp/users/253f3f04-7858-4969-99c1-094a8c1729c0
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
    "id": "253f3f04-7858-4969-99c1-094a8c1729c0",
    "namespace": "testapp"
}
```
### convert
##### put /api/testapp/users/c8ac0e29-6c3c-48aa-a325-79852c427698/convert/testing
```js
// req

```
```js
// res
{
    "name": "testing",
    "userId": "c8ac0e29-6c3c-48aa-a325-79852c427698",
    "experiments": {
        "convertible": "b",
        "expTest": "e"
    },
    "namespace": "testapp",
    "timestamp": "2014-07-07T05:40:04.658Z"
}
```
#(Admin) User
### set testing group
##### put /api/testapp/users/253f3f04-7858-4969-99c1-094a8c1729c0/group/same
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
    "id": "253f3f04-7858-4969-99c1-094a8c1729c0",
    "namespace": "testapp"
}
```
### remove from experiment
##### delete /api/testapp/users/11f5659d-9466-43d8-83fa-3b58255f5549/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "11f5659d-9466-43d8-83fa-3b58255f5549",
    "namespace": "testapp",
    "info": {
        "ip": "127.0.0.1",
        "isMobile": false,
        "isiPad": false,
        "isiPod": false,
        "isiPhone": false,
        "isAndroid": false,
        "isBlackberry": false,
        "isOpera": false,
        "isIE": false,
        "isIECompatibilityMode": false,
        "isSafari": false,
        "isFirefox": false,
        "isWebkit": false,
        "isChrome": false,
        "isKonqueror": false,
        "isOmniWeb": false,
        "isSeaMonkey": false,
        "isFlock": false,
        "isAmaya": false,
        "isEpiphany": false,
        "isDesktop": false,
        "isWindows": false,
        "isLinux": false,
        "isLinux64": false,
        "isMac": false,
        "isBada": false,
        "isSamsung": false,
        "isRaspberry": false,
        "isBot": false,
        "isCurl": false,
        "isAndroidTablet": false,
        "isWinJs": false,
        "Browser": "unknown",
        "OS": "unknown",
        "Platform": "unknown",
        "source": ""
    }
}
```
### add to experiment
##### put /api/testapp/users/11f5659d-9466-43d8-83fa-3b58255f5549/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "11f5659d-9466-43d8-83fa-3b58255f5549",
    "namespace": "testapp",
    "info": {
        "ip": "127.0.0.1",
        "isMobile": false,
        "isiPad": false,
        "isiPod": false,
        "isiPhone": false,
        "isAndroid": false,
        "isBlackberry": false,
        "isOpera": false,
        "isIE": false,
        "isIECompatibilityMode": false,
        "isSafari": false,
        "isFirefox": false,
        "isWebkit": false,
        "isChrome": false,
        "isKonqueror": false,
        "isOmniWeb": false,
        "isSeaMonkey": false,
        "isFlock": false,
        "isAmaya": false,
        "isEpiphany": false,
        "isDesktop": false,
        "isWindows": false,
        "isLinux": false,
        "isLinux64": false,
        "isMac": false,
        "isBada": false,
        "isSamsung": false,
        "isRaspberry": false,
        "isBot": false,
        "isCurl": false,
        "isAndroidTablet": false,
        "isWinJs": false,
        "Browser": "unknown",
        "OS": "unknown",
        "Platform": "unknown",
        "source": ""
    },
    "experiments": {
        "expTest": "e"
    }
}
```
### add to experiment, with value
##### put /api/testapp/users/11f5659d-9466-43d8-83fa-3b58255f5549/experiments/expTest/red
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
    "id": "11f5659d-9466-43d8-83fa-3b58255f5549",
    "info": {
        "ip": "127.0.0.1",
        "isMobile": false,
        "isiPad": false,
        "isiPod": false,
        "isiPhone": false,
        "isAndroid": false,
        "isBlackberry": false,
        "isOpera": false,
        "isIE": false,
        "isIECompatibilityMode": false,
        "isSafari": false,
        "isFirefox": false,
        "isWebkit": false,
        "isChrome": false,
        "isKonqueror": false,
        "isOmniWeb": false,
        "isSeaMonkey": false,
        "isFlock": false,
        "isAmaya": false,
        "isEpiphany": false,
        "isDesktop": false,
        "isWindows": false,
        "isLinux": false,
        "isLinux64": false,
        "isMac": false,
        "isBada": false,
        "isSamsung": false,
        "isRaspberry": false,
        "isBot": false,
        "isCurl": false,
        "isAndroidTablet": false,
        "isWinJs": false,
        "Browser": "unknown",
        "OS": "unknown",
        "Platform": "unknown",
        "source": ""
    },
    "namespace": "testapp"
}
```
#(Admin) Experiment
### create
##### post /api/testapp/experiments
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
    "namespace": "testapp",
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
### get
##### get /api/testapp/experiments
```js
// req

```
```js
// res
[
    {
        "namespace": "testapp",
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
]
```
### remove
##### delete /api/testapp/experiments/expTest
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
##### get /api/testapp/experiments/dingdong/results?from=1/1/14&to=1/3/14&split=Platform,Browser&conversion=ding
```js
// req

```
```js
// res
[
    {
        "test": "a",
        "splits": {
            "Platform": "Linux",
            "Browser": "Chrome"
        },
        "data": [
            {
                "count": 1,
                "timestamp": "2014-01-01T08:00:00.000Z"
            },
            {
                "count": 1,
                "timestamp": "2014-01-02T08:00:00.000Z"
            },
            {
                "count": 2,
                "timestamp": "2014-01-03T08:00:00.000Z"
            }
        ]
    },
    {
        "test": "b",
        "splits": {
            "Platform": "Linux",
            "Browser": "Chrome"
        },
        "data": [
            {
                "count": 2,
                "timestamp": "2014-01-01T08:00:00.000Z"
            },
            {
                "count": 1,
                "timestamp": "2014-01-02T08:00:00.000Z"
            },
            {
                "count": 1,
                "timestamp": "2014-01-03T08:00:00.000Z"
            }
        ]
    },
    {
        "test": "a",
        "splits": {
            "Platform": "Apple Mac",
            "Browser": "Chrome"
        },
        "data": [
            {
                "count": 2,
                "timestamp": "2014-01-01T08:00:00.000Z"
            },
            {
                "count": 1,
                "timestamp": "2014-01-03T08:00:00.000Z"
            }
        ]
    }
]
```