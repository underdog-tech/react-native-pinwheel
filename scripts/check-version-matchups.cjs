const fs = require('fs')
const baseVersion = require('../package.json').version
const exampleVersion = require('../example/package.json').version
const packageName = '@pinwheel/react-native-pinwheel'
const installVersion = require('../example/package.json')
  .dependencies[packageName]
  .split('react-native-pinwheel-')[1]
  .replace('.tgz', '')

const CONSTANTS_FILE_LOCATION = './src/constants.ts'
const versionInConstants = fs.readFileSync(CONSTANTS_FILE_LOCATION, 'utf-8')
  .match(/export const VERSION \= \'.+\';/)[0]
  .split('=')[1]
  .trim()
  .replace(/('|"|;)/g, '')

const PODSPEC_FILE = './RNPinwheelSDK.podspec'
const versionInPodspec = fs.readFileSync(PODSPEC_FILE, 'utf-8')
  .match(/s\.version      = \".+\"/)[0]
  .split('=')[1]
  .trim()
  .replace(/('|"|;)/g, '')

const allVersions = []

console.log(`Got package version (package.json): ${baseVersion}`)
allVersions.push(baseVersion)

console.log(`Got version from constants file (${CONSTANTS_FILE_LOCATION}): ${versionInConstants}`)
allVersions.push(versionInConstants)

console.log(`Got version from podspec file (${PODSPEC_FILE}): ${versionInPodspec}`)
allVersions.push(versionInPodspec)

console.log(`Got example app (example/package.json) version: ${exampleVersion}`)
allVersions.push(exampleVersion)

console.log(`Got example app installation of package (${packageName}): ${installVersion}\n\n`)
allVersions.push(installVersion)

if ((new Set(allVersions)).size !== 1) {
// if ((baseVersion !== exampleVersion || exampleVersion !== installVersion || baseVersion !== versionInConstants)) {
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

const version = allVersions[0]
const [a, b, c] = version.split('.')
const regexForChangelog = new RegExp(`### \\[?${a}\.${b}\.${c}\\D`)
const changelog = fs.readFileSync('./CHANGELOG.md', 'utf-8')
if (!changelog.match(regexForChangelog)) {
  const errorMsg = `Version entry (${version}) not found in CHANGELOG.md`
  throw new Error(errorMsg)
} else {
  console.log(`CHANGELOG.md contains version entry ${version}`)
}

console.log('success, check passed')
