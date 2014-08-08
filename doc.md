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
    "id": "9ae2b4f3-ce26-4438-91e3-ee6b723cc7a3",
    "namespace": "testapp"
}
```
### get
##### get /api/testapp/users/7e40727f-80c6-44ba-8dd7-16f91f6b813f
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
    "id": "7e40727f-80c6-44ba-8dd7-16f91f6b813f",
    "namespace": "testapp"
}
```
### convert
##### put /api/testapp/users/6132571c-8090-4685-9f75-0f645ad8eeff/convert/testing
```js
// req

```
```js
// res
{
    "name": "testing",
    "userId": "6132571c-8090-4685-9f75-0f645ad8eeff",
    "experiments": {
        "convertible": "a",
        "expTest": "c"
    },
    "namespace": "testapp",
    "timestamp": "2014-08-08T21:30:11.146Z"
}
```
#(Admin) User
### set testing group
##### put /api/testapp/users/7e40727f-80c6-44ba-8dd7-16f91f6b813f/group/same
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
    "id": "7e40727f-80c6-44ba-8dd7-16f91f6b813f",
    "namespace": "testapp"
}
```
### remove from experiment
##### delete /api/testapp/users/0930157d-3276-46f4-99f9-b297a7050971/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "0930157d-3276-46f4-99f9-b297a7050971",
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
##### put /api/testapp/users/0930157d-3276-46f4-99f9-b297a7050971/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "0930157d-3276-46f4-99f9-b297a7050971",
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
        "expTest": "b"
    }
}
```
### add to experiment, with value
##### put /api/testapp/users/0930157d-3276-46f4-99f9-b297a7050971/experiments/expTest/red
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
    "id": "0930157d-3276-46f4-99f9-b297a7050971",
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
        "participantCount": 1,
        "splits": {
            "Platform": "Apple Mac",
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
        "participantCount": 1,
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
        "participantCount": 1,
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
                "timestamp": "2014-01-03T08:00:00.000Z"
            }
        ]
    }
]
```