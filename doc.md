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
    "id": "2b7381cb-d457-4ae2-a6b6-df1b487217ff"
}
```
### get
##### get /api/users/55c629e0-eda2-49c4-8523-3b91fc765350
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
    "id": "55c629e0-eda2-49c4-8523-3b91fc765350"
}
```
### convert
##### put /api/users/79f665f0-aed3-4614-81ec-fa69cab3b5b6/convert/testing
```js
// req

```
```js
// res
{
    "name": "testing",
    "userId": "79f665f0-aed3-4614-81ec-fa69cab3b5b6",
    "experiments": {
        "convertible": "a",
        "expTest": "red"
    },
    "timestamp": "2014-07-07T04:43:30.158Z"
}
```
#(Admin) User
### set testing group
##### put /api/users/55c629e0-eda2-49c4-8523-3b91fc765350/group/same
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
    "id": "55c629e0-eda2-49c4-8523-3b91fc765350"
}
```
### remove from experiment
##### delete /api/users/606ee199-44c8-4dfc-913c-6767ddb8cca1/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "606ee199-44c8-4dfc-913c-6767ddb8cca1",
    "info": {
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
##### put /api/users/606ee199-44c8-4dfc-913c-6767ddb8cca1/experiments/expTest
```js
// req

```
```js
// res
{
    "group": "tester",
    "id": "606ee199-44c8-4dfc-913c-6767ddb8cca1",
    "info": {
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
        "expTest": "c"
    }
}
```
### add to experiment, with value
##### put /api/users/606ee199-44c8-4dfc-913c-6767ddb8cca1/experiments/expTest/red
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
    "id": "606ee199-44c8-4dfc-913c-6767ddb8cca1",
    "info": {
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
### get
##### get /api/experiments
```js
// req

```
```js
// res
[
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
]
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
##### get /api/experiments/dingdong/results?from=1/1/14&to=1/3/14&split=Platform,Browser&conversion=ding
```js
// req

```
```js
// res
[
    {
        "test": "a",
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