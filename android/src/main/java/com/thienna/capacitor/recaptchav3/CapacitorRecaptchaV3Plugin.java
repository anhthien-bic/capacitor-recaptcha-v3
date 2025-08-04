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
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", implementation.echo(value));
        call.resolve(ret);
    }
}
