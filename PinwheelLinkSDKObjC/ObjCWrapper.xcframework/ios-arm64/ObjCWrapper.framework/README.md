Build for iOS device
```
xcodebuild archive -scheme ObjCWrapper -configuration Release -destination 'generic/platform=iOS' -archivePath './build/ObjCWrapper.framework-iphoneos.xcarchive' SKIP_INSTALL=NO BUILD_LIBRARIES_FOR_DISTRIBUTION=YES
```

Build for simulator
```
xcodebuild archive -scheme ObjCWrapper -configuration Release -destination 'generic/platform=iOS Simulator' -archivePath './build/ObjCWrapper.framework-iphonesimulator.xcarchive' SKIP_INSTALL=NO BUILD_LIBRARIES_FOR_DISTRIBUTION=YES
```

Create a universal framework
```
xcodebuild -create-xcframework -framework './build/ObjCWrapper.framework-iphoneos.xcarchive/Products/Library/Frameworks/ObjCWrapper.framework' -framework './build/ObjCWrapper.framework-iphonesimulator.xcarchive/Products/Library/Frameworks/ObjCWrapper.framework' -output './build/ObjCWrapper.xcframework'
```

