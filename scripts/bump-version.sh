v_pkgjson=$(node -e "console.log(require('./package.json').version)")

echo Found version in package.json: $v_pkgjson

v_src=$(node -e "const fs=require('fs');const file='./src/constants.ts';const contents=fs.readFileSync(file, 'utf8');const newContents = contents.replace(/VERSION\W*\=\W*[0-9\.]+/, 'VERSION = \'$v_pkgjson\''); console.log(newContents)")

echo Updated src folder