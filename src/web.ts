import { WebPlugin } from '@capacitor/core';

import type { CapacitorRecaptchaV3Plugin, RecaptchaClient } from './definitions';

export class CapacitorRecaptchaV3Web extends WebPlugin implements CapacitorRecaptchaV3Plugin {
  async fetchClient({siteKey}: {siteKey: string}): Promise<RecaptchaClient> {
    console.log('fetchClient called with siteKey:', siteKey);
    // Web implementation would need to be implemented differently
    throw new Error('Web platform is not supported for reCAPTCHA Enterprise');
  }

  async initClient({siteKey, timeout}: {siteKey: string, timeout?: number}): Promise<void> {
    console.log('initClient called with siteKey:', siteKey, 'timeout:', timeout);
    // Web implementation would need to be implemented differently
    throw new Error('Web platform is not supported for reCAPTCHA Enterprise');
  }

  async execute({action, timeout}: {action: string, timeout?: number}): Promise<{token: string}> {
    console.log('execute called with action:', action, 'timeout:', timeout);
    // Web implementation would need to be implemented differently
    throw new Error('Web platform is not supported for reCAPTCHA Enterprise');
  }
}
