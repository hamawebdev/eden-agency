import arMessages from '@/messages/ar.json';
import enMessages from '@/messages/en.json';

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

// Simple translation function that gets translations based on locale
export function getTranslations(locale: string = 'ar') {
  const messages = locale === 'ar' ? arMessages : enMessages;
  
  return {
    t: (key: string): string => {
      const keys = key.split('.');
      let value: JsonValue = messages;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as JsonObject)[k];
        } else {
          // Fallback to English if key not found
          if (locale === 'ar') {
            let enValue: JsonValue = enMessages;
            for (const ek of keys) {
              if (enValue && typeof enValue === 'object' && ek in enValue) {
                enValue = (enValue as JsonObject)[ek];
              } else {
                return key; // Return key if not found
              }
            }
            return typeof enValue === 'string' ? enValue : key;
          }
          return key;
        }
      }
      
      return typeof value === 'string' ? value : key;
    },
    messages
  };
}

// Export translations directly for easier usage
export const translations = {
  ar: arMessages,
  en: enMessages
};

// Helper to get a nested translation value
export function t(key: string, locale: string = 'ar'): string {
  const messages = locale === 'ar' ? arMessages : enMessages;
  const keys = key.split('.');
  let value: JsonValue = messages;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as JsonObject)[k];
    } else {
      // Fallback
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
}
