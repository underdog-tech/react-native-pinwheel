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

echo Compiling tsc
npm run build

# echo Adding $pkgjsonversion tag to git
# git tag $pkgjsonversion

# echo Pushing tag
# git push --tags

echo Done!