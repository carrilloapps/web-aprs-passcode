# /src Directory

This directory contains the source code for the APRS Passcode Generator application.

## Structure

### `/app`
Contains Next.js App Router pages and layouts with internationalization support.

- `[locale]/layout.tsx` - Locale-specific layout wrapper with NextIntlClientProvider
- `[locale]/page.tsx` - Main application page

### `/components`
Reusable React components.

- `ui/` - shadcn-ui components (Button, Card, Input, Label, Select)
- `aprs-passcode-generator.tsx` - Main form component for generating APRS passcodes
- `language-switcher.tsx` - Language selection dropdown component

### `/i18n`
Internationalization configuration.

- `request.ts` - Server-side i18n configuration
- `routing.ts` - i18n routing setup with supported locales

### `/lib`
Utility functions and core business logic.

- `aprs.ts` - APRS passcode generation algorithm
- `utils.ts` - General utility functions (e.g., `cn` for className merging)

### `/middleware.ts`
Next.js middleware for handling locale-based routing.

## Component Guidelines

- All components are TypeScript with strict typing
- Use `'use client'` directive for client components
- Follow shadcn-ui patterns for UI components
- Maintain 100% test coverage for business logic
- Use next-intl for all user-facing text

## Testing

Each component and utility function should have a corresponding `.test.ts` or `.test.tsx` file in the same directory.

Test files should:
- Cover all functions and branches
- Mock external dependencies (next-intl, next/navigation)
- Use React Testing Library for component tests
- Follow AAA pattern (Arrange, Act, Assert)
