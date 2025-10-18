# Pinwheel SDK Expo Example App

The Pinwheel example app for our React Native SDK is provided as a playground for you to see how the component works, and test out its options, and events.

## Usage

### Set up Link token

Generate a Link token from the [Pinwheel Dashboard](https://dashboard.getpinwheel.com/). Then, update `const token = '<TOKEN>'` in App.tsx.

### Install dependencies

```bash
npm install
```

### Start React Native

```
npm start
```

### Run iOS app

```
npm run ios
```

### Run Android app

```
npm run android
```

### Using local dependencies

If you want to use the local version of the module, change package.json to:

`"@pinwheel/react-native-pinwheel": "file:../pinwheel-react-native-pinwheel-3.5.1.tgz"`
