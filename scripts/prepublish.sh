#!/bin/bash

set -e

pkgjsonversion=$(cat package.json | grep '"version":' | grep -E '([0-9]+\.[0-9]+\.[0-9]+[^"]*)' -o)
echo Got package.json version $pkgjsonversion

latestversion=$(npm show @pinwheel/react-native-pinwheel |
  head -n 2 |
  tail -n 1 |
  cut -d ' ' -f1 |
  cut -d '@' -f3 |
  sed $'s,\x1b\\[[0-9;]*[a-zA-Z],,g')
echo Got last published version $latestversion
echo

if [ $pkgjsonversion == $latestversion ]; then
  echo SKIPPING. Nothing to publish, package.json version matches the latest.
  exit 0
fi

echo Testing changelog updates.

grep -oq [^0-9]$pkgjsonversion[^0-9] CHANGELOG.md || (echo ERROR. Please update changelog. && exit 1)
echo Confirmed changelog updates!

echo Compiling tsc
npm run build

echo Packing the module
npm pack

# echo Adding $pkgjsonversion tag to git
# git tag $pkgjsonversion

# echo Pushing tag
# git push --tags

echo Done!