export interface CapacitorRecaptchaV3Plugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
