
    // "@pinwheel/react-native-pinwheel": {
    //   "version": "file:../pinwheel-react-native-pinwheel-2.3.11.tgz",
    //   "integrity": "sha512-uxHoWnRkjx9SDuA5EnaZSVtd2ELHMdTdWeme3WQzVv77VUzfP9vj+c2M3DDK4+UPRgg8K0PD+8BA9JvA6oTn9A==",
    //   "requires": {
    //     "hermes-engine": "^0.10.0"
    //   }
    // },

import fs from 'fs'

const packageLockLocation = '../example/package-lock.json'
const pkgName = 'node_modules/@pinwheel/react-native-pinwheel'

const contents = JSON.parse(fs.readFileSync(packageLockLocation, 'utf8'))

delete contents.packages[pkgName]

fs.writeFileSync(packageLockLocation, JSON.stringify(contents, null, 2))