# react-native-pinwheel

# Pinwheel SDK for React Native

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
import PinwheelLink from "react-native-pinwheel";

<PinwheelLink
  linkToken={response.data.token}
  onSuccess={onSuccess}
  onExit={onExit}
  onEvent={onEvent}
/>;
```

With the PinwheelLink component, end-users can select their employer, authenticate with their payroll platform login credentials, and authorize the direct deposit change. Throughout the authorization process, events will be emitted to the `onEvent` callback. Upon a successful authorization, the `onSuccess` callback will be called. `onExit` will be called when it is time to close the dialog, and you should remove the PinwheelLink component from your view hierarchy.

## Props

### `linkToken`

The link token retrieved using the [create link token endpoint](https://docs.getpinwheel.com/api-reference/index.html#create-link-token).

| Type   | Required |
| ------ | -------- |
| string | Yes      |

### `onSuccess`

Callback whenever a user completes a modal flow successfully. Note: This is simply a front end callback only. If a user begins a job, closes the app, and the job completes successfully this callback will not be called.

| Type     | Required |
| -------- | -------- |
| function | No       |

### `onExit`

Callback whenever a user exits the modal either explicitly or if an error occurred that crashed the modal. Error codes can be seen [here](https://docs.getpinwheel.com/link/index.html#errors-1).

| Type     | Required |
| -------- | -------- |
| function | Yes      |

### `onEvent`

Callback whenever a user interacts with the modal (e.g. clicks something or types something). The [eventName](https://docs.getpinwheel.com/link/index.html#events) can be used to gain insight into what the user is doing.

| Type     | Required |
| -------- | -------- |
| function | No       |

## Example App

See [example app readme](./example/README.md)
