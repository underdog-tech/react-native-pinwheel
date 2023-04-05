# react-native-pinwheel

Pinwheel SDK for React Native

## Running The Example App Locally

You may want to run the example app locally to get started.

#### Dependencies

- Node 16.7.0 (check with `node -v` and upgrade versions using `nvm`)
- iPhone 14 simulator (open your Simulator app and check the available versions)
- iOS 16 running on the simulator (open your Simulator app and check the available versions)
- `pod` version 1.11.3 (check with `pod --version`)
- Add your pinwheel secret to `example/env.js` (create this file) with `export default "<YOUR PINWHEEL SECRET>"`.

#### Directions

- `npm run dev`


## Installation

1. Install [`react-native-webview`](https://www.npmjs.com/package/react-native-webview) peer dependency.

```bash
$ npm install --save react-native-webview
$ cd ios && pod install
```

2. Install Pinwheel React Native SDK

```bash
$ npm install --save @pinwheel/react-native-pinwheel
```

## Usage

### Link Token

To initialize Link Modal, a short-lived link token will need to be generated first. Your server can generate the link token by sending a POST request to the /v1/link_tokens endpoint. DO NOT ever send this request from the client side and publicly expose your api_secret.

The link token returned is valid for 15 minutes, after which it expires and can no longer be used to initialize Link. The expiration time is returned as a unix timestamp.

### Pinwheel Component

The PinwheelLink component is a view that you can integrate into your app's flow like so:

```javascript
import PinwheelLink from "@pinwheel/react-native-pinwheel";

<PinwheelLink
  linkToken={response.data.token}
  onLogin={result => { /* ... */ }}
  onError={error => { /* ... */ }}
  onSuccess={result => { /* ... */ }}
  onExit={error => { /* ... */ }}
  onEvent={(eventName, payload) => { /* ... */ }}
/>;
```

With the PinwheelLink component, end-users can select their employer, authenticate with their payroll platform login credentials, and authorize the direct deposit change. Throughout the authorization process, events will be emitted to the `onEvent` callback and any errors (both user errors such as invalid parameters and any system errors which arise) will be emitted to the `onError` callback. Upon a successful login, `onLogin` will be called and once the full flow is complete the `onSuccess` callback will be called. `onExit` will be called when the Pinwheel modal is closed, and you should remove the PinwheelLink component from your view hierarchy.

## Props

### `linkToken`

The link token retrieved using the [create link token endpoint](https://docs.getpinwheel.com/docs/api/docs/guides/Link.md#link-token).

| Type   | Required |
| ------ | -------- |
| string | Yes      |

### `onLogin`

Callback when a user successfully signs in to their payroll account.

| Type     | Required |
| -------- | -------- |
| function | No       |

### `onError`

Callback whenever an error occurs during the modal flow. This does not necessarily mean that the flow cannot still complete successfully. These include such retryable events as the user inputting an incorrect password or MFA code and needs to reattempt it. Error codes can be seen [here](https://docs.getpinwheel.com/docs/api/docs/guides/Link.md#errors-1).

| Type     | Required |
| -------- | -------- |
| function | No      |

### `onSuccess`

Callback whenever a user completes a modal flow successfully. Note: This is simply a front end callback only. If a user begins a job, closes the app, and the job completes successfully this callback will not be called.

| Type     | Required |
| -------- | -------- |
| function | No       |

### `onExit`

Callback whenever a user exits the modal either explicitly or if an error occurred that crashed the modal. Error codes can be seen [here](https://docs.getpinwheel.com/docs/api/docs/guides/Link.md#errors-1). Will pass back an error result if the modal either crashed due to an error or if the user exited while in an error state (e.g. invalid credentials).

| Type     | Required |
| -------- | -------- |
| function | No      |

### `onEvent`

Callback for all significant events that happen during the modal flow. See all possible [event types](https://docs.getpinwheel.com/docs/api/docs/guides/Link.md#events).

| Type     | Required |
| -------- | -------- |
| function | No       |
