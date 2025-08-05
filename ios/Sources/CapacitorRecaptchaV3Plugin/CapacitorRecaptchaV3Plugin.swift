import Foundation
import Capacitor
import RecaptchaEnterprise

@objc(CapacitorRecaptchaV3Plugin)
public class CapacitorRecaptchaV3Plugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "CapacitorRecaptchaV3Plugin"
    public let jsName = "CapacitorRecaptchaV3"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "fetchClient", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "initClient", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "execute", returnType: CAPPluginReturnPromise)
    ]
    
    private var recaptchaClient: RecaptchaClient?

    private func mapAction(_ actionStr: String) -> RecaptchaAction {
        switch actionStr {
        case "login":
            return .login
        case "signup":
            return .signup
        default:
            return RecaptchaAction(customAction: actionStr)
        }
    }

    @objc func fetchClient(_ call: CAPPluginCall) {
        guard let siteKey = call.getString("siteKey") else {
            call.reject("siteKey is required")
            return
        }

        Recaptcha.fetchClient(withSiteKey: siteKey) { client, error in
            if let client = client {
                self.recaptchaClient = client
                call.resolve()
            } else if let error = error as? RecaptchaError {
                call.reject(error.errorMessage ?? "Unknown error", String(error.errorCode.rawValue), error)
            } else {
                call.reject("Unknown error")
            }
        }
    }

    @objc func initClient(_ call: CAPPluginCall) {
        guard let siteKey = call.getString("siteKey") else {
            call.reject("siteKey is required")
            return
        }

        let timeout = call.getDouble("timeout")

        let completion: (RecaptchaClient?, Error?) -> Void = { client, error in
            if let client = client {
                self.recaptchaClient = client
                call.resolve()
            } else if let error = error as? RecaptchaError {
                call.reject(error.errorMessage ?? "Unknown error", String(error.errorCode.rawValue), error)
            } else {
                call.reject("Unknown error")
            }
        }

        if let timeout = timeout {
            Recaptcha.getClient(withSiteKey: siteKey, withTimeout: timeout, completion: completion)
        } else {
            Recaptcha.getClient(withSiteKey: siteKey, completion: completion)
        }
    }

    @objc func execute(_ call: CAPPluginCall) {
        guard let action = call.getString("action") else {
            call.reject("action is required")
            return
        }

        guard let client = recaptchaClient else {
            call.reject("Client not initialized")
            return
        }

        let recaptchaAction = mapAction(action)
        let timeout = call.getDouble("timeout")

        let completion: (String?, Error?) -> Void = { token, error in
            if let token = token {
                var result = JSObject()
                result["token"] = token
                call.resolve(result)
            } else if let error = error as? RecaptchaError {
                call.reject(error.errorMessage ?? "Unknown error", String(error.errorCode.rawValue), error)
            } else {
                call.reject("Unknown error")
            }
        }

        if let timeout = timeout {
            client.execute(withAction: recaptchaAction, withTimeout: timeout, completion: completion)
        } else {
            client.execute(withAction: recaptchaAction, completion: completion)
        }
    }
}
