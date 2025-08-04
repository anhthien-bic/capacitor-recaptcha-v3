# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial implementation of Capacitor Recaptcha V3 plugin
- Support for iOS and Android platforms
- TypeScript definitions and interfaces
- RecaptchaAction class with built-in actions (LOGIN, SIGNUP)
- RecaptchaClient interface and implementation
- Promise-based API for all operations
- Timeout support for all operations
- Error handling for failed operations
- Web platform support (throws error as expected)
- Comprehensive documentation and examples

### Features
- `fetchClient()` - Fetch a reCAPTCHA client immediately
- `initClient()` - Initialize a reCAPTCHA client (deprecated)
- `execute()` - Execute reCAPTCHA and retrieve a token
- `RecaptchaAction.LOGIN()` - Built-in login action
- `RecaptchaAction.SIGNUP()` - Built-in signup action
- `RecaptchaAction.custom()` - Custom action support

### Technical Details
- Based on Google Cloud reCAPTCHA Enterprise React Native module
- Mock implementations for iOS and Android (ready for real SDK integration)
- Static linking support for iOS
- Flipper disabled for iOS compatibility
- Comprehensive TypeScript support
- JSDoc documentation generation

## [0.0.1] - 2024-08-04

### Added
- Initial plugin structure
- Basic echo functionality
- iOS and Android project setup
- Build configuration
- Documentation generation 