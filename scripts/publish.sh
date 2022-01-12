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

# - Create a new branch `git checkout -b release-2.3.4`
# - Bump the version number in `package.json`: `"version": "2.3.4"`
# - Add and commit to git `git add . && git commit -m 'Release 2.3.4'`
# - `npm run build`
# - `git tag '2.3.4'`
# - `git push --tags`
# - `git push origin release-2.3.4`
# - `npm publish` (you will need to have set up your NPM credentials for this to work)
# - Open a PR to merge the release branch back to master