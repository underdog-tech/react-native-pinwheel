package com.rtnpinwheel

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.underdog_tech.pinwheel_android.PinwheelEventListener
import com.underdog_tech.pinwheel_android.model.PinwheelEventPayload
import com.underdog_tech.pinwheel_android.model.PinwheelEventType
import com.underdog_tech.pinwheel_android.model.PinwheelInputAllocationPayload
import com.underdog_tech.pinwheel_android.model.PinwheelTarget
import com.underdog_tech.pinwheel_android.model.PinwheelAllocation
import com.underdog_tech.pinwheel_android.model.PinwheelBillSwitchEventPayload
import com.underdog_tech.pinwheel_android.model.PinwheelParams
import com.underdog_tech.pinwheel_android.model.PinwheelResult
import com.underdog_tech.pinwheel_android.model.PinwheelError
import com.underdog_tech.pinwheel_android.model.PinwheelSelectedEmployerPayload
import com.underdog_tech.pinwheel_android.model.PinwheelSelectedPlatformPayload
import com.underdog_tech.pinwheel_android.model.PinwheelLoginPayload
import com.underdog_tech.pinwheel_android.model.PinwheelLoginAttemptPayload
import com.underdog_tech.pinwheel_android.model.PinwheelDDFormCreatePayload
import com.underdog_tech.pinwheel_android.model.PinwheelExternalAccountConnectedPayload
import com.underdog_tech.pinwheel_android.model.PinwheelOtherEventPayload
import com.underdog_tech.pinwheel_android.model.PinwheelScreenTransitionPayload

@ReactModule(name = PinwheelEventsModule.NAME)
class PinwheelEventsModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context), PinwheelEventListener {
  init {
    Companion.context = context
  }

  override fun getName(): String = NAME

  @ReactMethod
  fun setListener() {
    hasListeners = true;
  }

  @ReactMethod
  fun removeListener() {
    hasListeners = false;
  }

  @ReactMethod
  fun addListener(eventName: String) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  override fun onEvent(eventName: PinwheelEventType, payload: PinwheelEventPayload?) {
    if (!hasListeners) return

    val params = WritableNativeMap()
    params.putString("name", eventName.toString())
    if (payload != null) {
      params.putMap("payload", payload.toWritableMap())
    }

    context
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(Companion.PinwheelEventName, params)
  }

  companion object {
    const val NAME = "RTNPinwheelEvents"
    const val PinwheelEventName = "PINWHEEL_EVENT"
    private var context: ReactApplicationContext? = null
    private var hasListeners = false;
  }
}

fun PinwheelTarget.toWritableMap(): WritableMap {
  return Arguments.createMap().apply {
    putString("accountType", this@toWritableMap.accountType)
    putString("accountName", this@toWritableMap.accountName)
  }
}

fun PinwheelAllocation.toWritableMap(): WritableMap {
  return Arguments.createMap().apply {
    putString("type", this@toWritableMap.type)
    this@toWritableMap.value?.let { putDouble("value", it.toDouble()) }
    putMap("target", this@toWritableMap.target?.toWritableMap())
  }
}

fun PinwheelParams.toWritableMap(): WritableMap {
  return Arguments.createMap().apply {
    putString("action", this@toWritableMap.action)
    putMap("allocation", this@toWritableMap.allocation?.toWritableMap())
  }
}

fun PinwheelEventPayload.toWritableMap(): WritableMap = when (this) {

  is PinwheelInputAllocationPayload -> Arguments.createMap().apply {
    putString("action", this@toWritableMap.action)
    putMap("allocation", this@toWritableMap.allocation?.toWritableMap())
  }

  is PinwheelResult -> Arguments.createMap().apply {
    putString("accountId", this@toWritableMap.accountId)
    putString("platformId", this@toWritableMap.platformId)
    putString("job", this@toWritableMap.job)
    putMap("params", this@toWritableMap.params?.toWritableMap())
  }

  is PinwheelError -> Arguments.createMap().apply {
    putString("type", this@toWritableMap.type)
    putString("code", this@toWritableMap.code)
    putString("message", this@toWritableMap.message)
    putBoolean("pendingRetry", this@toWritableMap.pendingRetry)
  }

  is PinwheelSelectedEmployerPayload -> Arguments.createMap().apply {
    putString("selectedEmployerId", this@toWritableMap.selectedEmployerId)
    putString("selectedEmployerName", this@toWritableMap.selectedEmployerName)
  }

  is PinwheelSelectedPlatformPayload -> Arguments.createMap().apply {
    putString("selectedPlatformId", this@toWritableMap.selectedPlatformId)
    putString("selectedPlatformName", this@toWritableMap.selectedPlatformName)
  }

  is PinwheelLoginPayload -> Arguments.createMap().apply {
    putString("accountId", this@toWritableMap.accountId)
    putString("platformId", this@toWritableMap.platformId)
  }

  is PinwheelLoginAttemptPayload -> Arguments.createMap().apply {
    putString("platformId", this@toWritableMap.platformId)
  }

  is PinwheelDDFormCreatePayload -> Arguments.createMap().apply {
    putString("url", this@toWritableMap.url)
  }

  is PinwheelScreenTransitionPayload -> Arguments.createMap().apply {
    putString("screenName", this@toWritableMap.screenName)
    putString("selectedEmployerId", this@toWritableMap.selectedEmployerId)
    putString("selectedEmployerName", this@toWritableMap.selectedEmployerName)
    putString("selectedPlatformId", this@toWritableMap.selectedPlatformId)
    putString("selectedPlatformName", this@toWritableMap.selectedPlatformName)
  }

  is PinwheelOtherEventPayload -> Arguments.createMap().apply {
    putString("name", this@toWritableMap.name)
    val payloadArray = Arguments.createArray()
    this@toWritableMap.payload.forEach { item ->
      val map = Arguments.createMap()
      map.putString("key", item.key)
      map.putString("value", item.value)
      map.putString("type", item.type.name)
      payloadArray.pushMap(map)
    }
    putArray("payload", payloadArray)
  }

  is PinwheelBillSwitchEventPayload -> Arguments.createMap().apply {
    putString("platformId", this@toWritableMap.platformId)
    putString("platformName", this@toWritableMap.platformName)
    putBoolean("isIntegratedSwitch", this@toWritableMap.isIntegratedSwitch)
    putString("frequency", this@toWritableMap.frequency)
    putString("nextPaymentDate", this@toWritableMap.nextPaymentDate)
    putInt("amountCents", this@toWritableMap.amountCents)
  }

  is PinwheelExternalAccountConnectedPayload -> Arguments.createMap().apply {
    putString("institutionName", this@toWritableMap.institutionName)
    putString("accountName", this@toWritableMap.accountName)
  }

  else -> throw IllegalArgumentException("Unsupported PinwheelEventPayload type")
}
