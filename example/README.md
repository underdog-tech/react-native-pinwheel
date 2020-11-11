# Pinwheel SDK example app

The Pinwheel example app for our React Native SDK is provided as a playground for you to see how the component works, and test out its options, and events.

## Usage

Add your API secret in App.js. Note that this is only for demo purposes--you should never ship your app with your API secret, and instead fetch a Link token from your server as outlined in the [Pinwheel Docs](https://docs.getpinwheel.com/)

```javascript
const API_SECRET = "";
```

Install dependencies

```bash
npm install
```

Install iOS dependencies

```bash
cd ios && pod install
```

Start react native

```
npx react-native start
```

Run iOS app

```
npx react-native run-ios
```

Run Android app

```
npx react-native run-android
```
