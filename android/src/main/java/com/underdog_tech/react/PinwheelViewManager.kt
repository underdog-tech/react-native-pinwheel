package com.underdog_tech.react

import android.view.Choreographer
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactPropGroup
import com.facebook.react.uimanager.annotations.ReactProp
import com.underdog_tech.pinwheel_android.PinwheelFragment
import com.underdog_tech.pinwheel_android.PinwheelEventListener
import com.underdog_tech.pinwheel_android.model.PinwheelEventType
import com.underdog_tech.pinwheel_android.model.PinwheelEventPayload
import com.underdog_tech.pinwheel_android.model.PinwheelAmount
import com.underdog_tech.pinwheel_android.model.PinwheelTarget
import com.underdog_tech.pinwheel_android.model.PinwheelAllocation
import com.underdog_tech.pinwheel_android.model.PinwheelParams
import com.underdog_tech.pinwheel_android.model.PinwheelResult
import com.underdog_tech.pinwheel_android.model.PinwheelError
import com.underdog_tech.pinwheel_android.model.PinwheelSelectedEmployerPayload
import com.underdog_tech.pinwheel_android.model.PinwheelSelectedPlatformPayload
import com.underdog_tech.pinwheel_android.model.PinwheelLoginPayload
import com.underdog_tech.pinwheel_android.model.PinwheelLoginAttemptPayload
import com.underdog_tech.pinwheel_android.model.PinwheelDDFormCreatePayload
import com.underdog_tech.pinwheel_android.model.PinwheelScreenTransitionPayload
import com.underdog_tech.pinwheel_android.model.PinwheelInputAmountPayload

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
    putMap("amount", this@toWritableMap.amount?.toWritableMap())
  }
}

fun PinwheelEventPayload.toWritableMap(): WritableMap = when (this) {
  is PinwheelAmount -> Arguments.createMap().apply {
    putDouble("value", this@toWritableMap.value.toDouble())
    putString("unit", this@toWritableMap.unit)
  }

  is PinwheelInputAmountPayload -> Arguments.createMap().apply {
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
  else -> throw IllegalArgumentException("Unsupported PinwheelEventPayload type")
}

class PinwheelViewManager(
  private val reactContext: ReactApplicationContext
) : ViewGroupManager<FrameLayout>(), PinwheelEventListener {
  private var propWidth: Int? = reactContext.resources.displayMetrics.widthPixels
  private var propHeight: Int? = reactContext.resources.displayMetrics.heightPixels
  private var token: String? = null

  override fun getName() = REACT_CLASS

  /**
   * Return a FrameLayout which will later hold the Fragment
   */
  override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {
    return FrameLayout(reactContext)
  }

  /**
   * Map the "create" command to an integer
   */
  override fun getCommandsMap() = mapOf("create" to COMMAND_CREATE)

  /**
   * Handle "create" command (called from JS) and call createFragment method
   */
  override fun receiveCommand(
    root: FrameLayout,
    commandId: String,
    args: ReadableArray?
  ) {
    super.receiveCommand(root, commandId, args)
    val reactNativeViewId = requireNotNull(args).getInt(0)

    when (commandId.toInt()) {
      COMMAND_CREATE -> createFragment(root, reactNativeViewId)
    }
  }

  @ReactPropGroup(names = ["width", "height"], customType = "Style")
  fun setStyle(view: FrameLayout, index: Int, value: Int) {
    if (index == 0) propWidth = value
    if (index == 1) propHeight = value
  }

  @ReactProp(name="token")
  fun setToken(view: FrameLayout, token: String) {
    this.token = token
  }

  /**
   * Replace your React Native view with a custom fragment
   */
  fun createFragment(root: FrameLayout, reactNativeViewId: Int) {
    val parentView = root.findViewById<ViewGroup>(reactNativeViewId)
    setupLayout(parentView)


    this.token?.let {
      val pinwheelFragment = PinwheelFragment.newInstance(it, "react native")
      pinwheelFragment.pinwheelEventListener = this
      val activity = reactContext.currentActivity as FragmentActivity
      activity.supportFragmentManager
        .beginTransaction()
        .replace(reactNativeViewId, pinwheelFragment, reactNativeViewId.toString())
        .commit()
    }
  }

  fun setupLayout(view: View) {
    Choreographer.getInstance().postFrameCallback(object: Choreographer.FrameCallback {
      override fun doFrame(frameTimeNanos: Long) {
        manuallyLayoutChildren(view)
        view.viewTreeObserver.dispatchOnGlobalLayout()
        Choreographer.getInstance().postFrameCallback(this)
      }
    })
  }

  override fun onEvent(eventName: PinwheelEventType, payload: PinwheelEventPayload?) {
    val params = WritableNativeMap()
    params.putString("name", eventName.toString())
    params.putMap("payload", payload?.toWritableMap())
    reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit("PINWHEEL_EVENT", params)
  }

  /**
   * Layout all children properly
   */
  private fun manuallyLayoutChildren(view: View) {
    // propWidth and propHeight coming from react-native props
    val width = requireNotNull(propWidth)
    val height = requireNotNull(propHeight)

    view.measure(
        View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
        View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY))

    view.layout(0, 0, width, height)
  }

  companion object {
    private const val REACT_CLASS = "RNTPinwheel"
    private const val COMMAND_CREATE = 1
  }
}