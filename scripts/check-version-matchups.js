const baseVersion = require('../package.json').version
const exampleVersion = require('../example/package.json').version
const packageName = '@pinwheel/react-native-pinwheel'
const installVersion = require('../example/package.json')
  .dependencies[packageName]
  .match(/[0-9]+\.[0-9]+\.[0-9]+\..*/)
  [0]
  .replace('.tgz', '')

console.log(`Got package version (package.json): ${baseVersion}`)
console.log(`Got example app (example/package.json) version: ${exampleVersion}`)
console.log(`Got example app installation of package (${packageName}): ${installVersion}`)

if (baseVersion === exampleVersion && exampleVersion === installVersion) {
  console.log('success, check passed')
}
