#!/bin/bash

set -e

pkgjsonversion=$(cat package.json | grep '"version":' | grep -E '([0-9]+\.[0-9]+\.[0-9]+[^"]*)' -o)
latestversion=$(npm list --silent | head -n 1 | cut -d ' ' -f1 | cut -d '@' -f3)

if [ $pkgjsonversion == $latestversion ]; then
  echo SKIPPING. Nothing to publish! No version change from $latestversion
  exit 0
fi

npm run build

npm publish

git tag $pkgjsonversion

git push --tags
