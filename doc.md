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
    "id": "0c83bda8-9bf8-49d6-bb28-18b8a327632a",
    "namespace": "testapp"
}
```
### get
##### get /api/testapp/users/6d4f0ce0-c078-42f1-b96f-b98a96b3e60b
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
    "id": "6d4f0ce0-c078-42f1-b96f-b98a96b3e60b",
    "namespace": "testapp"
}
```
### convert
##### put /api/testapp/users/28c76755-b3ec-473d-9afe-2701633f1325/convert/testing
```js
// req

```
```js
// res
{
    "name": "testing",
    "userId": "28c76755-b3ec-473d-9afe-2701633f1325",
    "experiments": {
        "convertible": "b",
        "expTest": "d"
    },
    "namespace": "testapp",
    "timestamp": "2014-07-07T07:15:58.895Z"
}
```
#(Admin) User
### set testing group
##### put /api/testapp/users/6d4f0ce0-c078-42f1-b96f-b98a96b3e60b/group/same
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
    "id": "6d4f0ce0-c078-42f1-b96f-b98a96b3e60b",
    "namespace": "testapp"
}
```
### remove from experiment
##### delete /api/testapp/users/3ea6bd3c-6dd6-48ee-b585-7fdfb2765cfc/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "3ea6bd3c-6dd6-48ee-b585-7fdfb2765cfc",
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
##### put /api/testapp/users/3ea6bd3c-6dd6-48ee-b585-7fdfb2765cfc/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "3ea6bd3c-6dd6-48ee-b585-7fdfb2765cfc",
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
        "expTest": "f"
    }
}
```
### add to experiment, with value
##### put /api/testapp/users/3ea6bd3c-6dd6-48ee-b585-7fdfb2765cfc/experiments/expTest/red
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
    "id": "3ea6bd3c-6dd6-48ee-b585-7fdfb2765cfc",
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