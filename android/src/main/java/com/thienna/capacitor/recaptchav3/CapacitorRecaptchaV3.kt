package com.thienna.capacitor.recaptchav3

import android.app.Application
import com.getcapacitor.PluginCall
import com.google.android.recaptcha.Recaptcha
import com.google.android.recaptcha.RecaptchaAction
import com.google.android.recaptcha.RecaptchaClient
import com.google.android.recaptcha.RecaptchaException
import kotlinx.coroutines.*
import com.getcapacitor.JSObject

class CapacitorRecaptchaV3(private val application: Application) {

    private lateinit var recaptchaClient: RecaptchaClient

    private fun mapAction(actionStr: String): RecaptchaAction {
        return when (actionStr) {
            "login" -> RecaptchaAction.LOGIN
            "signup" -> RecaptchaAction.SIGNUP
            else -> RecaptchaAction.custom(actionStr)
        }
    }

    fun fetchClient(siteKey: String, call: PluginCall) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                recaptchaClient = Recaptcha.fetchClient(application, siteKey)
                call.resolve()
            } catch (e: Exception) {
                handleError(e, call)
            }
        }
    }

    fun initClient(siteKey: String, call: PluginCall) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val timeout = call.getDouble("timeout")?.toLong()
                recaptchaClient = if (timeout != null && timeout > 0) {
                    Recaptcha.getClient(application, siteKey, timeout).getOrThrow()
                } else {
                    Recaptcha.getClient(application, siteKey).getOrThrow()
                }
                call.resolve()
            } catch (e: Exception) {
                handleError(e, call)
            }
        }
    }

    fun execute(actionStr: String, call: PluginCall) {
        if (!::recaptchaClient.isInitialized) {
            call.reject("CLIENT_NOT_INITIALIZED", "Initialize client first")
            return
        }

        CoroutineScope(Dispatchers.IO).launch {
            try {
                val timeout = call.getDouble("timeout")?.toLong()
                val action = mapAction(actionStr)

                val token = if (timeout != null && timeout > 0) {
                    recaptchaClient.execute(action, timeout).getOrThrow()
                } else {
                    recaptchaClient.execute(action).getOrThrow()
                }

                val result = JSObject().put("token", token)
                call.resolve(result)
            } catch (e: Exception) {
                handleError(e, call)
            }
        }
    }

    private fun handleError(e: Exception, call: PluginCall) {
        if (e is RecaptchaException) {
            call.reject(e.errorCode.toString(), e.errorMessage, e)
        } else {
            call.reject("UNKNOWN_ERROR", e.message, e)
        }
    }
}