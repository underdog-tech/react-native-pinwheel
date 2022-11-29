v_pkgjson=$(node -e "console.log(require('./package.json').version)")
echo "---\n\nFound version in package.json: $v_pkgjson"

echo "\n\nEnter a new version number:"
read v_new

echo ⌛ Updating package.json
node -e "const fs=require('fs');const file='./package.json';const pkg=require(file); pkg.version='$v_new'; fs.writeFileSync(file, JSON.stringify(pkg, null, 2))"
echo ✅ Updated package.json

echo ⌛ Updating src folder
node -e "const fs=require('fs');const file='./src/constants.ts';const contents=fs.readFileSync(file, 'utf8');const newContents = contents.replace(/VERSION\W*\=\W*[0-9\.]+/, 'VERSION = \'$v_new\''); fs.writeFileSync(file, newContents)"
echo ✅ Updated src folder