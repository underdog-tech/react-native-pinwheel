package com.rtnpinwheel

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class PinwheelPackage : ReactPackage {
  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> =
    listOf(PinwheelManager(reactContext))

  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> =
    listOf(PinwheelEventsModule(reactContext))
}