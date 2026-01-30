package com.rtnpinwheel

import android.view.ViewGroup
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.annotations.ReactPropGroup
import com.facebook.react.viewmanagers.RTNPinwheelManagerInterface
import com.facebook.react.viewmanagers.RTNPinwheelManagerDelegate

@ReactModule(name = PinwheelManager.NAME)
class PinwheelManager(private val reactContext: ReactApplicationContext) :
    SimpleViewManager<Pinwheel>(),
    RTNPinwheelManagerInterface<Pinwheel> {

    private val delegate: RTNPinwheelManagerDelegate<Pinwheel, PinwheelManager> = RTNPinwheelManagerDelegate(this)
    private var propWidth: Int? = null
    private var propHeight: Int? = null

    override fun getDelegate(): ViewManagerDelegate<Pinwheel> = delegate

    override fun getName(): String = NAME

    override fun createViewInstance(context: ThemedReactContext): Pinwheel {
        val view = Pinwheel(context)
        (reactContext.getNativeModule(PinwheelEventsModule::class.java) as? PinwheelEventsModule)?.let { module ->
            view.setPinwheelEventListener(module)
        }

        return view
    }

    @ReactProp(name = "token")
    override fun setToken(view: Pinwheel, token: String?) {
        view.setToken(token)
    }

    @ReactProp(name = "handleInsets")
    override fun setHandleInsets(view: Pinwheel, handleInsets: Boolean) {
        view.setHandleInsets(handleInsets)
    }

    @ReactProp(name = "useDarkMode")
    override fun setUseDarkMode(view: Pinwheel, useDarkMode: Boolean) {
        view.setUseDarkMode(useDarkMode)
    }

    @ReactProp(name = "useSecureOrigin")
    override fun setUseSecureOrigin(view: Pinwheel, useSecureOrigin: Boolean) {
        view.setUseSecureOrigin(useSecureOrigin)
    }

    @ReactPropGroup(names = ["width", "height"], customType = "Style")
    fun setStyle(view: Pinwheel, index: Int, value: Int) {
        if (index == 0) propWidth = value
        if (index == 1) propHeight = value
        view.layoutParams = ViewGroup.LayoutParams(
            if (propWidth != null) propWidth!! else ViewGroup.LayoutParams.WRAP_CONTENT,
            if (propHeight != null) propHeight!! else ViewGroup.LayoutParams.WRAP_CONTENT
        )
    }

    companion object {
        const val NAME = "RTNPinwheel"
    }
}
