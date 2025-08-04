import { registerPlugin } from '@capacitor/core';

import type { CapacitorRecaptchaV3Plugin, RecaptchaAction, RecaptchaClient } from './definitions';
import { RecaptchaClientImpl } from './recaptcha-client';

const CapacitorRecaptchaV3 = registerPlugin<CapacitorRecaptchaV3Plugin>('CapacitorRecaptchaV3', {
  web: () => import('./web').then((m) => new m.CapacitorRecaptchaV3Web()),
});

/**
 * Interface to interact with reCAPTCHA.
 */
export class Recaptcha {
  private constructor() {}

  /**
   * Fetches a reCAPTCHA client immediately
   * @param siteKey Your application's reCAPTCHA site key
   */
  static fetchClient(siteKey: string): Promise<RecaptchaClient> {
    return CapacitorRecaptchaV3.fetchClient(siteKey).then(() => {
      return new RecaptchaClientImpl(CapacitorRecaptchaV3);
    });
  }
}

/**
 * Initialize a reCAPTCHA client
 * @deprecated Use {@link Recaptcha.fetchClient} instead
 * @param siteKey Your application's reCAPTCHA site key
 * @param timeout An optional timeout value in milliseconds
 */
export function initClient(siteKey: string, timeout?: number): Promise<string> {
  return CapacitorRecaptchaV3.initClient(siteKey, timeout);
}

/**
 * Execute reCAPTCHA and retrieve a token
 * @deprecated Use {@link RecaptchaClient.execute} instead
 * @param action An action to describe what the user is doing such as "login"
 * @param timeout An optional timeout value in milliseconds
 */
export function execute(action: RecaptchaAction, timeout?: number): Promise<string> {
  return CapacitorRecaptchaV3.execute(action, timeout);
}

export * from './definitions';
export { CapacitorRecaptchaV3 };
export { RecaptchaAction } from './recaptcha-action';
export { RecaptchaClient } from './recaptcha-client';
