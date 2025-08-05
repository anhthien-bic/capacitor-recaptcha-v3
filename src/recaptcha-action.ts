export class RecaptchaAction {
  action: string;

  constructor(action: string) {
    this.action = action;
  }

  static LOGIN(): RecaptchaAction {
    return new RecaptchaAction('login');
  }

  static SIGNUP(): RecaptchaAction {
    return new RecaptchaAction('signup');
  }

  static custom(action: string): RecaptchaAction {
    return new RecaptchaAction(action);
  }
} 