package com.underdog_tech.react

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.NativeModule
import com.facebook.react.uimanager.ViewManager

class PinwheelPackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return emptyList() // Return an empty list if you don't have any native modules
    }
        
  override fun createViewManagers(
      reactContext: ReactApplicationContext
  ) = listOf(PinwheelViewManager(reactContext))
}