export interface RecaptchaAction {
  action: string;
}

export interface RecaptchaClient {
  execute(action: RecaptchaAction, timeout?: number): Promise<string>;
}

export interface CapacitorRecaptchaV3Plugin {
  /**
   * Fetches a reCAPTCHA client immediately
   * @param siteKey Your application's reCAPTCHA site key
   */
  fetchClient(siteKey: string): Promise<RecaptchaClient>;
  
  /**
   * Initialize a reCAPTCHA client
   * @param siteKey Your application's reCAPTCHA site key
   * @param timeout An optional timeout value in milliseconds
   */
  initClient(siteKey: string, timeout?: number): Promise<string>;
  
  /**
   * Execute reCAPTCHA and retrieve a token
   * @param action An action to describe what the user is doing such as "login"
   * @param timeout An optional timeout value in milliseconds
   */
  execute(action: RecaptchaAction, timeout?: number): Promise<string>;
}
