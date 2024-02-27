# Changelog

All notable changes to this project will be documented in this file.

# 3.0.x Releases

- `3.0.x` Releases - [3.0.0](#300) | [3.0.1](#301) | [3.0.2](#302) | [3.0.3](#303) | [3.0.4](#304)

---
### [3.0.4](https://www.npmjs.com/package/@pinwheel/react-native-pinwheel/v/3.0.4)

####
Bugfix: Normalize event names to lower case. Event names began firing as uppercase in versions 3.0.0 and 2.5.0.

### [3.0.3](https://www.npmjs.com/package/@pinwheel/react-native-pinwheel/v/3.0.3)

Changed Minimum Android SDK requirements to 22

### [3.0.2](https://www.npmjs.com/package/@pinwheel/react-native-pinwheel/v/3.0.2)

Changed example app Minimum Android SDK requirements to 22

### [3.0.1](https://www.npmjs.com/package/@pinwheel/react-native-pinwheel/v/3.0.1)

Expand internal functionality to support a broader range of platforms and increase conversion rate.

### [3.0.0](https://www.npmjs.com/package/@pinwheel/react-native-pinwheel/v/3.0.0)

This new major version bump introduces an updated API to support partner-based switches.

#### Changed
- The `action` field in `input_allocation` event is now optional.
- The `params` field in the `success` event uses the `input_allocation` schema with fields `action` and `allocation`.

#### Removed
- Removed `LinkResult` type export. This was the old `success` event payload. The new payload has the same format as the newly exported `SuccessEventPayload`.
- Removed `EventPayload` type export. The event handler function will now be implicitly typed.
- Removed `ScreenTransition` type export. Use `ScreenTransitionEventPayload` instead.
- Removed `EmptyPayloadObject` type export.
- Removed `Error` type export. Use `ErrorEventPayload` instead. (`Error` was marked as deprecated in version 2.)
- Removed `ErrorType` type export. Use `PinwheelErrorType` instead. (`ErrorType` was marked as deprecated in version 2.)
- Removed `input_amount` event. Use `input_allocation` even instead.
- Removed `PINWHEEL_MESSAGE_TYPES`.

## 2.5.x Releases

[2.5.0](#250) | [2.5.1](#251) | [2.5.2](#252) | [2.5.3](#253) | [2.5.4](#254)

---
### [2.5.4](https://www.npmjs.com/package/@pinwheel/react-native-pinwheel/v/2.5.4)

#### Bugfix
Normalize event names to lower case. Event names began firing as uppercase in versions 3.0.0 and 2.5.0.

### [2.5.3](https://www.npmjs.com/package/@pinwheel/react-native-pinwheel/v/2.5.3)

#### Notes

Changed Minimum Android SDK requirements to 22

### [2.5.2](https://www.npmjs.com/package/@pinwheel/react-native-pinwheel/v/2.5.2)

#### Notes

Expand internal functionality to support a broader range of platforms and increase conversion rate.

### 2.5.1

#### Notes

- Internal contract changes

### 2.5.0

#### Notes

We're thrilled to announce the latest version of our SDK! While you'll find that our familiar API contract remains unchanged, there's a host of improvements that make this upgrade indispensable:

- **Enhanced Redundancy**: 🛡️ We've fortified our systems, ensuring smoother recovery from integration failures for a significant percentage of our traffic.
- **Superior Uptime**: 🦾 Reliability is a top priority. This upgrade brings even more robust uptime for DDS integrations.
- **Increased Conversion**: ↗️ We are leveraging system level features to increase conversion.
- **Easy Upgrade**: 🥧 No changes were made to the API contract. Easy as pie.

## 2.4.x Releases

[2.4.0](#240)

---

### 2.4.0

- Removing `overrides` from main package.
- Updating example app to use newest ReactNative versions.
- Changing devDependencies to use newest React Native Webview (for typing).

## 2.3.x Releases

[2.3.4](#234) | [2.3.5](#235) | [2.3.6](#236) | [2.3.10](#2310) | [2.3.12](#2312) | [2.3.13](#2313) | [2.3.14](#2314) | [2.3.17](#2317)

---

### 2.3.17

Export `ScreenTransition` event payload type for the `screen_transition` event.


### 2.3.14

Remove `hermes-engine` and `shell-quote` sub-dependencies from package-lock files.

### 2.3.13

Bump `hermes-engine` and `shell-quote` sub-dependency package.

### 2.3.12

Add CircleCI scripting and local scripts.
- Add `npm run dev` script.
- Remove need for hardcoding api secret in code to run locally.

### 2.3.10

Use node 16.7.0 instead of 12.16.1 to install dependencies.

### [2.3.6](https://www.npmjs.com/package/@pinwheel/react-native-pinwheel/v/2.3.6)

N/A

### [2.3.5](https://www.npmjs.com/package/@pinwheel/react-native-pinwheel/v/2.3.5)

N/A

### [2.3.4](https://www.npmjs.com/package/@pinwheel/react-native-pinwheel/v/2.3.4)

#### Added

- Export `EventPayload` type.
- Export `PinwheelError` type.
- Export `PinwheelErrorType` type.
- Export `EmptyPayloadObject` type as `Record<string, never>`.

##### Updated

- `EventPayload` is no longer a union containing `{}`. It now contains `Record<string, never>` instead due to [this behavior](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-all-types-assignable-to-empty-interfaces).
- Mark exported `Error` type as **@deprecated** because it collides with the built-in javascript `Error` object. Replaced with `PinwheelError`.
- Mark exported `ErrorType` type as **@deprecated** because the new naming convention is prefixing with "`PinwheelError`". Replaced with `PinwheelErrorType`.
- Update `onExit` type to be `(error: PinwheelError | Record<string, never>)` to be accurate with current functionality.
