import fs from 'fs'

/**
 * The purpose of this script is to delete the react-native-pinwheel object from example/package-lock.json.
 * We run this script on the CI when testing the build of the example app. We need to remove this object
 * since it will refer to the local object's SHA-256 hash and on `npm i` of the example app we will recieve
 * an "EINTEGRITY" error because of the hash mismatch.
 */

const packageLockLocation = '../example/package-lock.json'
const pkgName = 'node_modules/@pinwheel/react-native-pinwheel'

const contents = JSON.parse(fs.readFileSync(packageLockLocation, 'utf8'))

delete contents.packages[pkgName]

fs.writeFileSync(packageLockLocation, JSON.stringify(contents, null, 2))