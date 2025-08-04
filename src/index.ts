import { registerPlugin } from '@capacitor/core';

import type { CapacitorRecaptchaV3Plugin } from './definitions';

const CapacitorRecaptchaV3 = registerPlugin<CapacitorRecaptchaV3Plugin>('CapacitorRecaptchaV3', {
  web: () => import('./web').then((m) => new m.CapacitorRecaptchaV3Web()),
});

export * from './definitions';
export { CapacitorRecaptchaV3 };
