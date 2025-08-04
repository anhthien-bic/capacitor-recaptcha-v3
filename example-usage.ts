import { CapacitorRecaptchaV3, RecaptchaAction } from 'capacitor-recaptcha-v3';

// Example 1: Using the new Recaptcha class (recommended)
async function exampleWithRecaptchaClass() {
  try {
    // Fetch a reCAPTCHA client
    const client = await CapacitorRecaptchaV3.fetchClient('your-site-key-here');
    
    // Execute reCAPTCHA with login action
    const token = await client.execute(RecaptchaAction.LOGIN());
    console.log('Login token:', token);
    
    // Execute reCAPTCHA with custom action
    const customToken = await client.execute(RecaptchaAction.custom('purchase'));
    console.log('Custom action token:', customToken);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 2: Using deprecated methods (for backward compatibility)
async function exampleWithDeprecatedMethods() {
  try {
    // Initialize client
    const initResult = await CapacitorRecaptchaV3.initClient('your-site-key-here', 5000);
    console.log('Init result:', initResult);
    
    // Execute reCAPTCHA
    const token = await CapacitorRecaptchaV3.execute(RecaptchaAction.SIGNUP(), 5000);
    console.log('Signup token:', token);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 3: Using different actions
async function exampleWithDifferentActions() {
  try {
    const client = await CapacitorRecaptchaV3.fetchClient('your-site-key-here');
    
    // Login action
    const loginToken = await client.execute(RecaptchaAction.LOGIN());
    console.log('Login token:', loginToken);
    
    // Signup action
    const signupToken = await client.execute(RecaptchaAction.SIGNUP());
    console.log('Signup token:', signupToken);
    
    // Custom actions
    const purchaseToken = await client.execute(RecaptchaAction.custom('purchase'));
    console.log('Purchase token:', purchaseToken);
    
    const commentToken = await client.execute(RecaptchaAction.custom('comment'));
    console.log('Comment token:', commentToken);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 4: Error handling
async function exampleWithErrorHandling() {
  try {
    const client = await CapacitorRecaptchaV3.fetchClient('your-site-key-here');
    
    const token = await client.execute(RecaptchaAction.LOGIN(), 10000); // 10 second timeout
    console.log('Token received:', token);
    
  } catch (error) {
    if (error instanceof Error) {
      console.error('reCAPTCHA error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
}

// Export examples for use in other files
export {
  exampleWithRecaptchaClass,
  exampleWithDeprecatedMethods,
  exampleWithDifferentActions,
  exampleWithErrorHandling
}; 