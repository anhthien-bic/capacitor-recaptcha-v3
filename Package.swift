// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorRecaptchaV3",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapacitorRecaptchaV3",
            targets: ["CapacitorRecaptchaV3Plugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0"),
        .package(url: "https://github.com/GoogleCloudPlatform/recaptcha-enterprise-mobile-sdk", from: "18.7.0")
    ],
    targets: [
        .target(
            name: "CapacitorRecaptchaV3Plugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .product(name: "RecaptchaEnterprise", package: "recaptcha-enterprise-mobile-sdk")
            ],
            path: "ios/Sources/CapacitorRecaptchaV3Plugin"),
        .testTarget(
            name: "CapacitorRecaptchaV3PluginTests",
            dependencies: ["CapacitorRecaptchaV3Plugin"],
            path: "ios/Tests/CapacitorRecaptchaV3PluginTests")
    ]
)