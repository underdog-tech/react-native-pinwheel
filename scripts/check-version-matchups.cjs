const fs = require('fs')
const baseVersion = require('../package.json').version
const exampleVersion = require('../example/package.json').version
const packageName = '@pinwheel/react-native-pinwheel'
const installVersion = require('../example/package.json')
  .dependencies[packageName]
  .match(/[0-9]+\.[0-9]+\.[0-9]+\..*/)
  [0]
  .replace('.tgz', '')

const CONSTANTS_FILE_LOCATION = '../src/constants.ts'
const versionInConstants = fs.readFileSync(CONSTANTS_FILE_LOCATION, 'utf-8')
  .match(/export const VERSION \= \'.+\';/)[0]
  .split('=')[1]
  .trim()
  .replace(/('|"|;)/g, '')

console.log(`Got package version (package.json): ${baseVersion}`)
console.log(`Got version from constants file (${CONSTANTS_FILE_LOCATION}): ${versionInConstants}`)
console.log(`Got example app (example/package.json) version: ${exampleVersion}`)
console.log(`Got example app installation of package (${packageName}): ${installVersion}\n\n`)

if (baseVersion !== exampleVersion || exampleVersion !== installVersion || baseVersion !== versionInConstants) {
  const errorMessage = 'Versions did not match up. (See above logs.) Please sync them all.'
  console.log(`
------------------------------------------------------------------------
------------------------------------------------------------------------
>> ${errorMessage}
------------------------------------------------------------------------
------------------------------------------------------------------------
`)
  throw new Error(errorMessage)
}

  console.log('success, check passed')
