set -e

if [ ! -f example/env.js ]; then
  echo "export default \"\"" > example/env.js
  echo "Please add your sandbox api secret to example/env.js"
  exit 1
fi


node -v | grep 16.7.0 || (echo 'Please use node 16.7.0. If you want to use a different node version, comment out this line in scripts/dev.sh and continue.' && exit 1)

npm run bump-pkg-version

npm i
npm run build
npm pack
cd example
npm i

./node_modules/.bin/concurrently "npx react-native start --reset-cache" "cd ios && pod install && cd ../ && npm run ios"
