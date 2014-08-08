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
    "id": "1d6ce965-0c81-4f8d-9b78-27dd9cda7a3a",
    "namespace": "testapp"
}
```
### get
##### get /api/testapp/users/cddc853b-a9df-4541-a707-ce517a2b6e51
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
    "id": "cddc853b-a9df-4541-a707-ce517a2b6e51",
    "namespace": "testapp"
}
```
### convert
##### put /api/testapp/users/630c6797-a5e4-4a49-ad86-50c1d4d3a77d/convert/testing
```js
// req

```
```js
// res
{
    "name": "testing",
    "userId": "630c6797-a5e4-4a49-ad86-50c1d4d3a77d",
    "experiments": {
        "convertible": "b",
        "expTest": "red"
    },
    "namespace": "testapp",
    "timestamp": "2014-08-08T21:34:22.761Z"
}
```
#(Admin) User
### set testing group
##### put /api/testapp/users/cddc853b-a9df-4541-a707-ce517a2b6e51/group/same
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
    "id": "cddc853b-a9df-4541-a707-ce517a2b6e51",
    "namespace": "testapp"
}
```
### remove from experiment
##### delete /api/testapp/users/fd661712-bee0-4b5f-862e-09eb88d1cf1b/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "fd661712-bee0-4b5f-862e-09eb88d1cf1b",
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
##### put /api/testapp/users/fd661712-bee0-4b5f-862e-09eb88d1cf1b/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "fd661712-bee0-4b5f-862e-09eb88d1cf1b",
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
##### put /api/testapp/users/fd661712-bee0-4b5f-862e-09eb88d1cf1b/experiments/expTest/red
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
    "id": "fd661712-bee0-4b5f-862e-09eb88d1cf1b",
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