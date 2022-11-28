import fs from 'fs'

const packageLockLocation = '../example/package-lock.json'
const pkgName = 'node_modules/@pinwheel/react-native-pinwheel'

const contents = JSON.parse(fs.readFileSync(packageLockLocation, 'utf8'))

delete contents.packages[pkgName]

fs.writeFileSync(packageLockLocation, JSON.stringify(contents, null, 2))