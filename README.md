# capacitor-recaptcha-v3

reCAPTCHA Enterprise Capacitor Plugin

This plugin provides reCAPTCHA Enterprise functionality for Capacitor applications on iOS and Android platforms. It's based on the [Google Cloud reCAPTCHA Enterprise React Native module](https://github.com/GoogleCloudPlatform/recaptcha-enterprise-react-native).

## Features

- ✅ iOS and Android support
- ✅ TypeScript support
- ✅ Promise-based API
- ✅ Built-in action types (LOGIN, SIGNUP)
- ✅ Custom action support
- ✅ Timeout configuration
- ✅ Error handling

## Install

```bash
npm install capacitor-recaptcha-v3
npx cap sync
```

## Setup

### iOS Setup

1. Add the following to your `ios/App/Podfile`:

```ruby
use_frameworks! :linkage => :static

# Disable Flipper for static linking compatibility
flipper_config = FlipperConfiguration.disabled
```

2. Run pod install:

```bash
cd ios && pod install && cd ..
```

### Android Setup

No additional setup required for Android.

## Usage

### Basic Usage

```typescript
import { CapacitorRecaptchaV3, RecaptchaAction } from 'capacitor-recaptcha-v3';

// Fetch a reCAPTCHA client
const client = await CapacitorRecaptchaV3.fetchClient('your-site-key-here');

// Execute reCAPTCHA with login action
const token = await client.execute(RecaptchaAction.LOGIN());
console.log('Token:', token);
```

### Using Different Actions

```typescript
// Built-in actions
const loginToken = await client.execute(RecaptchaAction.LOGIN());
const signupToken = await client.execute(RecaptchaAction.SIGNUP());

// Custom actions
const purchaseToken = await client.execute(RecaptchaAction.custom('purchase'));
const commentToken = await client.execute(RecaptchaAction.custom('comment'));
```

### With Timeout

```typescript
// Execute with 10 second timeout
const token = await client.execute(RecaptchaAction.LOGIN(), 10000);
```

### Error Handling

```typescript
try {
  const client = await CapacitorRecaptchaV3.fetchClient('your-site-key-here');
  const token = await client.execute(RecaptchaAction.LOGIN());
  console.log('Success:', token);
} catch (error) {
  console.error('Error:', error);
}
```

### Deprecated Methods (for backward compatibility)

```typescript
// Initialize client (deprecated)
const initResult = await CapacitorRecaptchaV3.initClient('your-site-key-here', 5000);

// Execute directly (deprecated)
const token = await CapacitorRecaptchaV3.execute(RecaptchaAction.LOGIN(), 5000);
```

## API

<docgen-index>

* [`fetchClient(...)`](#fetchclient)
* [`initClient(...)`](#initclient)
* [`execute(...)`](#execute)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### fetchClient(...)

```typescript
fetchClient(siteKey: string) => Promise<RecaptchaClient>
```

Fetches a reCAPTCHA client immediately

| Param         | Type                | Description                           |
| ------------- | ------------------- | ------------------------------------- |
| **`siteKey`** | <code>string</code> | Your application's reCAPTCHA site key |

**Returns:** <code>Promise&lt;<a href="#recaptchaclient">RecaptchaClient</a>&gt;</code>

--------------------


### initClient(...)

```typescript
initClient(siteKey: string, timeout?: number | undefined) => Promise<string>
```

Initialize a reCAPTCHA client

| Param         | Type                | Description                               |
| ------------- | ------------------- | ----------------------------------------- |
| **`siteKey`** | <code>string</code> | Your application's reCAPTCHA site key     |
| **`timeout`** | <code>number</code> | An optional timeout value in milliseconds |

**Returns:** <code>Promise&lt;string&gt;</code>

--------------------


### execute(...)

```typescript
execute(action: RecaptchaAction, timeout?: number | undefined) => Promise<string>
```

Execute reCAPTCHA and retrieve a token

| Param         | Type                                                        | Description                                                  |
| ------------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| **`action`**  | <code><a href="#recaptchaaction">RecaptchaAction</a></code> | An action to describe what the user is doing such as "login" |
| **`timeout`** | <code>number</code>                                         | An optional timeout value in milliseconds                    |

**Returns:** <code>Promise&lt;string&gt;</code>

--------------------


### Interfaces


#### RecaptchaClient

| Method      | Signature                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| **execute** | (action: <a href="#recaptchaaction">RecaptchaAction</a>, timeout?: number \| undefined) =&gt; Promise&lt;string&gt; |


#### RecaptchaAction

| Prop         | Type                |
| ------------ | ------------------- |
| **`action`** | <code>string</code> |

</docgen-api>

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm run verify
```

### Linting

```bash
npm run lint
```

## Common Issues

### iOS Build Issues

If you encounter build issues on iOS, make sure:

1. You're using static linking in your Podfile
2. Flipper is disabled
3. You've run `pod install` after adding the plugin

### Android Build Issues

If you encounter build issues on Android, make sure:

1. Your Android SDK is properly configured
2. You've synced the project with `npx cap sync`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT

## Acknowledgments

This plugin is based on the [Google Cloud reCAPTCHA Enterprise React Native module](https://github.com/GoogleCloudPlatform/recaptcha-enterprise-react-native).
