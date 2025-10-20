package com.rtnpinwheel

import android.content.Context
import android.graphics.Color
import android.os.Handler
import android.os.Looper
import android.util.AttributeSet
import android.util.Log
import android.view.Choreographer
import android.view.View
import android.widget.FrameLayout
import androidx.fragment.app.FragmentActivity
import com.underdog_tech.pinwheel_android.PinwheelEventListener
import com.underdog_tech.pinwheel_android.PinwheelFragment
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.modules.systeminfo.ReactNativeVersion

class Pinwheel : FrameLayout {
  private var token: String? = null
  private var pinwheelFragment: PinwheelFragment? = null
  private var pinwheelEventListener: PinwheelEventListener? = null
  private var handleInsets: Boolean = true
  private var useDarkMode: Boolean = false
  private var fragmentContainer: FrameLayout? = null

  constructor(context: Context) : super(context) {
    init()
  }

  constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
    init()
  }

  constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(
    context,
    attrs,
    defStyleAttr
  ) {
    init()
  }

  private fun init() {
    // Match background color of Link. We may want to have a loader here in the future.
    setBackgroundColor(Color.WHITE)

    // Create a FrameLayout to act as the fragment container
    fragmentContainer = FrameLayout(context)
    fragmentContainer!!.id = View.generateViewId()
    addView(fragmentContainer, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT))

    if (isAttachedToWindow) {
      createFragment()
    } else {
      addOnAttachStateChangeListener(object : OnAttachStateChangeListener {
        override fun onViewAttachedToWindow(v: View) {
          createFragment()
          removeOnAttachStateChangeListener(this)
        }

        override fun onViewDetachedFromWindow(v: View) {}
      })

      // Check again after adding the listener in case the the view attached before the listener
      // was added.
      if (isAttachedToWindow) {
        createFragment()
      }
    }
  }

  fun setToken(token: String?) {
    this.token = token
  }

  fun setHandleInsets(handleInsets: Boolean) {
    this.handleInsets = handleInsets
  }

  fun setUseDarkMode(useDarkMode: Boolean) {
    this.useDarkMode = useDarkMode
  }

  fun getReactNativeVersion(): String {
    val version = ReactNativeVersion.VERSION
    return "${version["major"]}.${version["minor"]}.${version["patch"]}"
  }

  private fun createFragment() {
    Handler(Looper.getMainLooper()).post {
      if (this.pinwheelFragment == null) {
        this.token?.let {
          val pinwheelFragment = PinwheelFragment.newInstanceWithAdvancedOptions(it, "react native", "3.5.2", getReactNativeVersion(), this.handleInsets, this.useDarkMode)
          pinwheelEventListener?.let { listener ->
            pinwheelFragment.pinwheelEventListener = listener
          }
          val reactContext = context as ThemedReactContext
          val activity = reactContext.currentActivity as? FragmentActivity

          val transaction = activity?.supportFragmentManager?.beginTransaction()
          transaction?.runOnCommit {
            fragmentContainer?.addView(pinwheelFragment.view)
          }
          transaction?.add(pinwheelFragment, pinwheelFragment.id.toString())?.commit()

          this.pinwheelFragment = pinwheelFragment
        }
      }
    }

    Handler(Looper.getMainLooper()).post {
      Choreographer.getInstance().postFrameCallback(object: Choreographer.FrameCallback {
        override fun doFrame(frameTimeNanos: Long) {
          setupLayoutSizing()
          // TODO: functionality works without this line, but it was present in the old SDK code
          //  view.viewTreeObserver.dispatchOnGlobalLayout()
          Choreographer.getInstance().postFrameCallback(this)
        }
      })
    }
  }

  fun setupLayoutSizing() {
    val left = this.left
    val top = this.top
    val width = this.width
    val height = this.height
    this.measure(
      View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
      View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY))

    this.layout(left, top, left + width, top + height)
  }

  fun setPinwheelEventListener(listener: PinwheelEventListener) {
    pinwheelEventListener = listener
    pinwheelFragment?.let {
      it.pinwheelEventListener = listener
    }
  }
}
