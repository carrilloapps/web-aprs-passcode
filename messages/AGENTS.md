# /messages Directory

This directory contains translation files for internationalization (i18n) using next-intl.

## Purpose

Each JSON file represents translations for a specific language/locale. The application supports the 10 most spoken languages in the world.

## Supported Locales

- `en.json` - English (default)
- `es.json` - Spanish (Español)
- `zh.json` - Chinese (中文)
- `hi.json` - Hindi (हिन्दी)
- `ar.json` - Arabic (العربية)
- `pt.json` - Portuguese (Português)
- `bn.json` - Bengali (বাংলা)
- `ru.json` - Russian (Русский)
- `ja.json` - Japanese (日本語)
- `fr.json` - French (Français)

## File Structure

Each translation file follows the same JSON structure with namespaced keys:

```json
{
  "app": {
    "title": "...",
    "description": "...",
    "callsignLabel": "...",
    "generateButton": "...",
    "passcodeLabel": "...",
    "invalidCallsign": "...",
    "sourceCode": "...",
    "github": "..."
  }
}
```

## Adding New Translations

When adding new text to the application:

1. Add the key to all language files
2. Provide accurate translations for each language
3. Use native scripts for non-Latin languages
4. Keep keys in English for consistency
5. Namespace related translations under common objects

## Usage in Components

Import and use translations with next-intl:

```tsx
import { useTranslations } from 'next-intl';

function Component() {
  const t = useTranslations('app');
  return <h1>{t('title')}</h1>;
}
```

## Translation Guidelines

- Keep translations concise and clear
- Maintain consistent tone across languages
- Use gender-neutral language when possible
- Consider cultural context for each locale
- Test RTL languages (Arabic) for proper layout
