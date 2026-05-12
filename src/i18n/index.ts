import { en } from './en';
import { zh } from './zh';

const translations: Record<string, Record<string, string>> = { en, zh };

export function t(locale: string | undefined, key: string): string {
  const lang = locale || 'en';
  return translations[lang]?.[key] ?? translations['en']?.[key] ?? key;
}

export { en, zh };
