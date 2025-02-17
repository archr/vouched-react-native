# Vouched React Native

[![npm version](https://img.shields.io/npm/v/@vouched.id/vouched-react-native.svg?style=flat-square)](https://www.npmjs.com/package/@vouched.id/vouched-react-native)

## Run Example

Clone this repo and change directory to _example_

```shell
git clone https://github.com/vouched/vouched-react-native
```

```shell
cd example
```

Then, follow steps listed on the [example README](https://github.com/vouched/vouched-react-native/blob/master/example/README.md)

## Prerequisites

- An account with Vouched
- Your Vouched Public Key
- Mobile Assets (available on the dashboard)

## Install

Add the package to your existing project

```shell
yarn add @vouched.id/vouched-react-native
```

Link the package

```shell
react-native link @vouched.id/vouched-react-native
```

iOS pods are not automatically installed, so we'll need to manually install them

```shell
 cd ios && pod install
```

## Reference

### VouchedSession

This class handles a user's Vouched session. It takes care of the API calls

##### Initialize a session

```javascript
const session = new VouchedSession(apiKey);
```

##### POST Front Id image

```javascript
const job = await session.postFrontId(cardDetectionResult);
```

`Parameters` - [CardDetectResult](#carddetectresult-object)  
`Returns` - [Job](#job-object)

##### POST Selfie image

```javascript
const job = await session.postFace(faceDetectionResult);
```

`Parameters` - [FaceDetectResult](#facedetectresult-object)  
`Returns` - [Job](#job-object)

##### POST Authentication

```javascript
const authResult = await session.postAuthenticate(
  faceDetectionResult,
  jobId,
  matchId
);
```

`Parameters` - [FaceDetectResult](#facedetectresult-object), String, Boolean  
`Returns` - [AuthenticateResult](#authenticateresult-object)

##### POST confirm verification

```javascript
const job = await session.confirm();
```

`Returns` - [Job](#job-object)

### IdCamera

Import and add to View

```javascript
import { VouchedIdCamera } from '@vouched.id/vouched-react-native';
...

    <VouchedIdCamera
        ref={cameraRef}
        enableDistanceCheck={true}
        onIdStream={async (cardDetectionResult) => {
            const { instruction, step } = cardDetectionResult;
            if (step === "POSTABLE") {
                cameraRef.current.stop();
                setMessage("Processing Image");
                try {
                    let job = await session.postFrontId(cardDetectionResult);
                    // proceed to next step
                } catch (e) {
                    // handle error
                }
            } else {
                setMessage(instruction)
            }
        }}
    />
```

| Properties          |                          Type                          | Default |
| ------------------- | :----------------------------------------------------: | ------: |
| enableDistanceCheck |                        Boolean                         |   false |
| onIdStream          | Callback<[CardDetectResult](#carddetectresult-object)> |         |

##### Stop IdCamera

```javascript
cameraRef.current.stop();
```

##### Restart IdCamera

```javascript
cameraRef.current.restart();
```

### FaceCamera

Import and add to View

```javascript
import { VouchedFaceCamera } from '@vouched.id/vouched-react-native';
...

    <VouchedFaceCamera
        ref={cameraRef}
        livenessMode="DISTANCE"
        onFaceStream={async (faceDetectionResult) => {
            const { instruction, step } = faceDetectionResult;
            if (step === "POSTABLE") {
                cameraRef.current.stop();
                setMessage("Processing Image");
                try {
                    let job = await session.postFrontId(faceDetectionResult);
                    // proceed to next step
                } catch (e) {
                    // handle error
                }
            } else {
                setMessage(instruction)
            }
        }}
    />
```

| Properties   |                          Type                          |  Default |
| ------------ | :----------------------------------------------------: | -------: |
| livenessMode |          [LivenessMode](#livenessmode-string)          | `"NONE"` |
| onFaceStream | Callback<[FaceDetectResult](#facedetectresult-object)> |          |

##### Stop FaceCamera

```javascript
cameraRef.current.stop();
```

##### Restart FaceCamera

```javascript
cameraRef.current.restart();
```

### Types

##### CardDetectResult `Object`

```javascript
{
    "instruction" : String,
    "step": String,
    "image": String?,
    "distanceImage": String?
}
```

Note: shouldn't be POSTed until the step is `"POSTABLE"`

##### FaceDetectResult `Object`

```javascript
{
    "instruction" : String,
    "step": String,
    "image": String?,
    "userDistanceImage": String?
}
```

Note: shouldn't be POSTed until the step is `"POSTABLE"`

##### Job `Object`

```javascript
{
    "result": JobResult,
    "id": String,
    "errors": [JobError],
    "token": String
}
```

##### JobResult `Object`

```javascript
{
    "issueDate": String?,
    "country": String?,
    "confidences": JobConfidence,
    "expireDate": String?,
    "success": Boolean,
    "state": String?,
    "lastName": String?
}
```

##### JobConfidence `Object`

```javascript
{
    "id": Number,
    "faceMatch": Number,
    "idGlareQuality": Number,
    "idQuality": Number
}
```

##### JobError `Object`

```javascript
{
    "type" : String,
    "message": String
}
```

##### AuthenticateResult `Object`

```javascript
{
    "match": Number
}
```

##### LivenessMode `String`

`"DISTANCE"` | `"MOUTH_MOVEMENT"` | `"BLINKING"` | `"NONE"`

##### Step `String`

`"PRE_DETECTED"` | `"DETECTED"` | `"POSTABLE"`

##### Instruction `String`

`"ONLY_ONE"` | `"MOVE_CLOSER"` | `"MOVE_AWAY"` | `"HOLD_STEADY"` | `"OPEN_MOUTH"` | `"CLOSE_MOUTH"` | `"LOOK_FORWARD"` | `"BLINK_EYES"`
