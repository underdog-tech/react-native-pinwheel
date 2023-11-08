package com.underdog_tech.react

import android.content.Context
import android.graphics.Color
import android.widget.FrameLayout
import android.widget.TextView

class PinwheelView(context: Context) : FrameLayout(context) {
  init {
    // set padding and background color
    setPadding(16,16,16,16)
    setBackgroundColor(Color.parseColor("#FFFFFF"))
  }
}