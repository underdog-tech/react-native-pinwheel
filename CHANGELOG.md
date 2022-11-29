# Changelog

All notable changes to this project will be documented in this file.

## 2.3.x Releases

- `2.3.x` Releases - [2.3.4](#234) | [2.3.5](#235) | [2.3.6](#236) | [2.3.10](#2310) | [2.3.12](#2312)

---

### [2.3.12](https://github.com/underdog-tech/react-native-pinwheel/releases/tag/2.3.12)

Add CircleCI scripting and local scripts.
- Add `npm run dev` script.
- Remove need for hardcoding api secret in code to run locally.

### [2.3.10](https://github.com/underdog-tech/react-native-pinwheel/releases/tag/2.3.10)

Use node 16.7.0 instead of 12.16.1 to install dependencies.

### [2.3.6](https://github.com/underdog-tech/react-native-pinwheel/releases/tag/2.3.6)

N/A

### [2.3.5](https://github.com/underdog-tech/react-native-pinwheel/releases/tag/2.3.5)

N/A

### [2.3.4](https://github.com/underdog-tech/react-native-pinwheel/releases/tag/2.3.4)

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
