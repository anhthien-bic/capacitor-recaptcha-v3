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
  fetchClient({siteKey}: {siteKey: string}): Promise<RecaptchaClient>;
  
  /**
   * Initialize a reCAPTCHA client
   * @param siteKey Your application's reCAPTCHA site key
   * @param timeout An optional timeout value in milliseconds
   */
  initClient({siteKey, timeout}: {siteKey: string, timeout?: number}): Promise<void>;
  
  /**
   * Execute reCAPTCHA and retrieve a token
   * @param action An action string to describe what the user is doing such as "login"
   * @param timeout An optional timeout value in milliseconds
   */
  execute({action, timeout}: {action: string, timeout?: number}): Promise<string>;
}
