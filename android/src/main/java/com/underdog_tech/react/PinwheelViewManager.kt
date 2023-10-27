package com.underdog_tech.react

import android.view.Choreographer
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReactMethod
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
      val pinwheelFragment = PinwheelFragment.newInstance(it)
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

  // override fun onSuccess(result: PinwheelResult) {
  //       Timber.d("ON SUCCESS: %s", result)
  //   }

  //   override fun onLogin(result: PinwheelLoginPayload) {
  //       Timber.d("ON LOGIN: %s", result)
  //   }

  //   override fun onLoginAttempt(result: PinwheelLoginAttemptPayload) {
  //       Timber.d("ON LOGIN ATTEMPT: %s", result)
  //   }

  //   override fun onError(error: PinwheelError) {
  //       Timber.d("ON ERROR: %s", error)
  //   }

  //   override fun onExit(error: PinwheelError?) {
  //       Timber.d("ON EXIT: %s", error)
  //       parentFragmentManager.popBackStack()
  //       Toast.makeText(context, "Pinwheel On Exit Event Fired", Toast.LENGTH_LONG).show()

  //       parentFragmentManager.let {
  //           val transaction = it.beginTransaction()
  //           val eventsFragment = EventsFragment(capturedEvents)
  //           transaction.replace(R.id.rootView, eventsFragment).addToBackStack("events").commit()
  //       }
  //   }

    override fun onEvent(eventName: PinwheelEventType, payload: PinwheelEventPayload?) {
        print("ON EVENT: $eventName $payload")
        val map = WritableNativeMap()

        map.putString("someProperty", "someValue")
        map.putString("anotherProperty", "anotherValue")
        sendEvent(reactContext, eventName.toString(), map)
    }

    private fun sendEvent(reactContext: ReactApplicationContext, eventName: String, payload: WritableMap?) {
      reactContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
          .emit("PINWHEEL_EVENT", payload?.apply { putString("eventName", eventName) })
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