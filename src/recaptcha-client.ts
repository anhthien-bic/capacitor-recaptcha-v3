/** A client that enables Android and iOS Apps to trigger reCAPTCHA Enterprise. */
export interface RecaptchaClient {
  /**
   * Execute reCAPTCHA and retrieve a token
   * @param action An action to describe what the user is doing such as "login"
   * @param timeout An optional timeout value in milliseconds
   */
  execute({action, timeout}: {action: string, timeout?: number}): Promise<string>;
}

export class RecaptchaClientImpl implements RecaptchaClient {
  constructor(private plugin: any) {}

  execute({action, timeout}: {action: string, timeout?: number}): Promise<string> {
    return this.plugin.execute({action, timeout});
  }
}
