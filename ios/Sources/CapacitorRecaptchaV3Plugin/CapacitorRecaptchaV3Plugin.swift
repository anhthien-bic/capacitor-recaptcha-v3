import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
public class CapacitorRecaptchaV3Plugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "CapacitorRecaptchaV3Plugin"
    public let jsName = "CapacitorRecaptchaV3"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "fetchClient", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "initClient", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "execute", returnType: CAPPluginReturnPromise)
    ]
    private let implementation = CapacitorRecaptchaV3()

    func fetchClient(_ call: CAPPluginCall) {
        let siteKey = call.getString("siteKey") ?? ""
        implementation.fetchClient(siteKey: siteKey) { result in
            switch result {
            case .success(let client):
                call.resolve([
                    "client": client
                ])
            case .failure(let error):
                call.reject(error.localizedDescription)
            }
        }
    }

    func initClient(_ call: CAPPluginCall) {
        let siteKey = call.getString("siteKey") ?? ""
        let timeout = call.getInt("timeout")
        implementation.initClient(siteKey: siteKey, timeout: timeout) { result in
            switch result {
            case .success(let token):
                call.resolve([
                    "token": token
                ])
            case .failure(let error):
                call.reject(error.localizedDescription)
            }
        }
    }

    func execute(_ call: CAPPluginCall) {
        let action = call.getObject("action") ?? [:]
        let actionName = action["action"] as? String ?? ""
        let timeout = call.getInt("timeout")
        implementation.execute(action: actionName, timeout: timeout) { result in
            switch result {
            case .success(let token):
                call.resolve([
                    "token": token
                ])
            case .failure(let error):
                call.reject(error.localizedDescription)
            }
        }
    }
}
