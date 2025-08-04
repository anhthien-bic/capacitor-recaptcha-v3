import { WebPlugin } from '@capacitor/core';

import type { CapacitorRecaptchaV3Plugin } from './definitions';

export class CapacitorRecaptchaV3Web extends WebPlugin implements CapacitorRecaptchaV3Plugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
