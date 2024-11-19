rm pinwheel-react-native-pinwheel-3.2.0.tgz
npm pack
cd example_expo
rm package-lock.json
rm -rf node_modules/@pinwheel
npm install
npx expo run:android
