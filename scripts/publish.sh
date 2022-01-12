#!/bin/bash

set -e

pkgjsonversion=$(cat package.json | grep '"version":' | grep -E '([0-9]+\.[0-9]+\.[0-9]+[^"]*)' -o)
latestversion=$(npm list --silent | head -n 1 | cut -d ' ' -f1 | cut -d '@' -f3)

if [ $pkgjsonversion == $latestversion ]; then
  echo SKIPPING. Nothing to publish! No version change from $latestversion
  exit 0
fi

echo Compiling tsc
npm run build

echo Publishing to NPM
npm publish

echo Adding $pkgjsonversion tag to git
git tag $pkgjsonversion

echo Pushing tag
git push --tags

echo Done!