export class RecaptchaAction {
  action: string;

  constructor(action: string) {
    this.action = action;
  }

  static LOGIN() {
    return new RecaptchaAction('login');
  }

  static SIGNUP() {
    return new RecaptchaAction('signup');
  }

  static custom(action: string) {
    return new RecaptchaAction(action);
  }
} 