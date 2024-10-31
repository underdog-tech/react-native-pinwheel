rm pinwheel-react-native-pinwheel-3.2.0-rc.0.tgz
npm pack
cd example_expo
rm package-lock.json
npm install
npx expo run:android
