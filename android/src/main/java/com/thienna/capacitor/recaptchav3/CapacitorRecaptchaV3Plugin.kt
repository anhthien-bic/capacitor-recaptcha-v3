package com.thienna.capacitor.recaptchav3;

import com.getcapacitor.*
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "CapacitorRecaptchaV3")
class CapacitorRecaptchaV3Plugin : Plugin() {

    private lateinit var implementation: CapacitorRecaptchaV3

    override fun load() {
        implementation = CapacitorRecaptchaV3(activity.application)
    }

    @PluginMethod
    fun fetchClient(call: PluginCall) {
        val siteKey = call.getString("siteKey")
        if (siteKey == null) {
            call.reject("siteKey is required")
            return
        }
        implementation.fetchClient(siteKey, call)
    }

    @PluginMethod
    fun initClient(call: PluginCall) {
        val siteKey = call.getString("siteKey")
        if (siteKey == null) {
            call.reject("siteKey is required")
            return
        }
        implementation.initClient(siteKey, call)
    }

    @PluginMethod
    fun execute(call: PluginCall) {
        val action = call.getString("action")
        if (action == null) {
            call.reject("action is required")
            return
        }
        implementation.execute(action, call)
    }
}
