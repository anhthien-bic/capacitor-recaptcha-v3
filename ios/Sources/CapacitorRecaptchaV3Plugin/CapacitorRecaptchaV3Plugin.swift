import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorRecaptchaV3Plugin)
public class CapacitorRecaptchaV3Plugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "CapacitorRecaptchaV3Plugin"
    public let jsName = "CapacitorRecaptchaV3"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
    ]
    private let implementation = CapacitorRecaptchaV3()

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
}
