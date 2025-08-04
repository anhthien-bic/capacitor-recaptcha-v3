package com.thienna.capacitor.recaptchav3;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "CapacitorRecaptchaV3")
public class CapacitorRecaptchaV3Plugin extends Plugin {

    private CapacitorRecaptchaV3 implementation = new CapacitorRecaptchaV3();

    @PluginMethod
    public void fetchClient(PluginCall call) {
        String siteKey = call.getString("siteKey");
        if (siteKey == null || siteKey.isEmpty()) {
            call.reject("Site key is required");
            return;
        }

        implementation.fetchClient(siteKey, new CapacitorRecaptchaV3.Callback() {
            @Override
            public void onSuccess(JSObject result) {
                call.resolve(result);
            }

            @Override
            public void onError(String error) {
                call.reject(error);
            }
        });
    }

    @PluginMethod
    public void initClient(PluginCall call) {
        String siteKey = call.getString("siteKey");
        Integer timeout = call.getInt("timeout");
        
        if (siteKey == null || siteKey.isEmpty()) {
            call.reject("Site key is required");
            return;
        }

        implementation.initClient(siteKey, timeout, new CapacitorRecaptchaV3.StringCallback() {
            @Override
            public void onSuccess(String token) {
                JSObject ret = new JSObject();
                ret.put("token", token);
                call.resolve(ret);
            }

            @Override
            public void onError(String error) {
                call.reject(error);
            }
        });
    }

    @PluginMethod
    public void execute(PluginCall call) {
        JSObject actionObj = call.getObject("action");
        String action = null;
        if (actionObj != null) {
            action = actionObj.getString("action");
        }
        Integer timeout = call.getInt("timeout");
        
        if (action == null || action.isEmpty()) {
            call.reject("Action is required");
            return;
        }

        implementation.execute(action, timeout, new CapacitorRecaptchaV3.StringCallback() {
            @Override
            public void onSuccess(String token) {
                JSObject ret = new JSObject();
                ret.put("token", token);
                call.resolve(ret);
            }

            @Override
            public void onError(String error) {
                call.reject(error);
            }
        });
    }
}
