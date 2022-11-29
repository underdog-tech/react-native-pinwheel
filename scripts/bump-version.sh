pkgjsonversion=$(node -e "console.log(require('./package.json').version)")

echo Found version in package.json: $pkgjsonversion