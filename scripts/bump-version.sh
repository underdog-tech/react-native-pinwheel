v_pkgjson=$(node -e "console.log(require('./package.json').version)")
echo "\n\nFound version in package.json: $v_pkgjson"

v_npm=$(npm show @pinwheel/react-native-pinwheel |
  head -n 2 |
  tail -n 1 |
  cut -d ' ' -f1 |
  cut -d '@' -f3 |
  sed $'s,\x1b\\[[0-9;]*[a-zA-Z],,g')
echo Got last published version $v_npm
echo

if [ $v_pkgjson != $v_npm ]; then
  echo SKIPPING version bump prompt as version is already bumped on this branch.
else
  echo "\n\nEnter a new version number:"
  read v_new

  echo ⌛ Updating package.json
  node -e "const fs=require('fs');const file='./package.json';const pkg=require(file); pkg.version='$v_new'; fs.writeFileSync(file, JSON.stringify(pkg, null, 2)+'\n')"
  echo ✅ Updated package.json

  echo ⌛ Updating src folder
  node -e "const fs=require('fs');const file='./src/constants.ts';const contents=fs.readFileSync(file, 'utf8');const newContents = contents.replace(/VERSION\W*\=\W*[0-9\.]+/, 'VERSION = \'$v_new\''); fs.writeFileSync(file, newContents)"
  echo ✅ Updated src folder

  echo ⌛ Updating example/package.json
  node -e "const fs=require('fs');const file='./example/package.json';const pkg=require(file); pkg.version='$v_new'; fs.writeFileSync(file, JSON.stringify(pkg, null, 2).replace(/pinwheel\-[0-9\.]+\.tgz/,'pinwheel-$v_new.tgz')+'\n')"
  echo ✅ Updated example/package.json
fi
