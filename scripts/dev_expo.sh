PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
echo "Package version: $PACKAGE_VERSION"

# Remove the tarball if it exists
TARBALL="pinwheel-react-native-pinwheel-${PACKAGE_VERSION}.tgz"
if [ -f "$TARBALL" ]; then
  echo "Removing existing tarball: $TARBALL"
  rm "$TARBALL"
fi

npm pack
cd example_expo
rm package-lock.json
rm -rf node_modules/@pinwheel

echo "Installing tarball: ../$TARBALL"
npm install "file:../$TARBALL"

npm start
