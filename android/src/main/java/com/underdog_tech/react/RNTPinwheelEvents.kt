package com.underdog_tech.react

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class RNTPinwheelEvents(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        private const val EVENT_KEY = "PINWHEEL_EVENT"
    }

    override fun getName(): String {
        return "RNTPinwheelEvents"
    }

    @ReactMethod
    fun anExposedMethod() {
        val currentContext = reactApplicationContext
        val eventName = "PINWHEEL_EVENT"
        val params: WritableMap = Arguments.createMap().apply {
            putString("type", "myEventType")
        }
        sendEvent(currentContext, eventName, params)
    }

    fun sendEvent(reactContext: ReactApplicationContext, eventName: String, params: WritableMap?) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(eventName, params)
    }

    private var listenerCount = 0

    @ReactMethod
    fun addListener(eventName: String) {
      if (listenerCount == 0) {
        // Set up any upstream listeners or background tasks as necessary
      }

      listenerCount += 1
    }

    @ReactMethod
    fun removeListeners(count: Int) {
      listenerCount -= count
      if (listenerCount == 0) {
        // Remove upstream listeners, stop unnecessary background tasks
      }
    }
}
