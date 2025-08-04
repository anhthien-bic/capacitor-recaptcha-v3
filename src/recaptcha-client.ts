import type { RecaptchaAction } from './definitions';

/** A client that enables Android and iOS Apps to trigger reCAPTCHA Enterprise. */
export interface RecaptchaClient {
  /**
   * Execute reCAPTCHA and retrieve a token
   * @param action An action to describe what the user is doing such as "login"
   * @param timeout An optional timeout value in milliseconds
   */
  execute(action: RecaptchaAction, timeout?: number): Promise<string>;
}

export class RecaptchaClientImpl implements RecaptchaClient {
  constructor(private plugin: any) {}

  execute(action: RecaptchaAction, timeout?: number): Promise<string> {
    return this.plugin.execute(action, timeout);
  }
} 