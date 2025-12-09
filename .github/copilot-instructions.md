# GitHub Copilot Instructions - APRS Passcode Generator

## Project Overview

Modern Next.js 16 app for generating APRS-IS passcodes with support for 10 languages. Built with App Router, Turbopack, shadcn-ui, and next-intl for internationalization.

## Architecture & Key Patterns

### Internationalization (i18n) - Central to Everything
- **10 supported locales**: en, es, zh, hi, ar, pt, bn, ru, ja, fr (see `src/i18n/routing.ts`)
- **Routing**: All routes use `[locale]` dynamic segment: `/[locale]/page.tsx`, `/[locale]/docs/*/page.tsx`
- **Middleware**: `src/proxy.ts` handles locale detection and routing (not `middleware.ts`)
- **Translations**: All user-facing text MUST go in `messages/*.json` with ALL 10 language files updated
- **Usage pattern**: Always use `useTranslations('namespace')` hook in client components, `getTranslations()` in server components

### Component Patterns
- **Client vs Server**: Most components are `'use client'` due to interactivity and i18n hooks
- **shadcn-ui**: Components in `src/components/ui/` follow Radix UI + Tailwind patterns
- **Styling**: Use `cn()` utility from `@/lib/utils` for conditional className merging
- **Icons**: lucide-react is the icon library (e.g., `Radio`, `Copy`, `CheckCircle2`)

### Testing Requirements - STRICT 100% Coverage
- **Coverage threshold**: 95% statements/lines, 100% branches, 80% functions (see `jest.config.ts`)
- **Test location**: Co-located with source files (e.g., `aprs.ts` → `aprs.test.ts`)
- **Test patterns**:
  ```typescript
  // Always mock next-intl
  jest.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key,
  }));
  
  // Always mock next/navigation
  jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn() }),
    usePathname: () => '/en',
  }));
  ```
- **Run tests**: `npm test` (unit), `npm run test:coverage` (with coverage report)
- **Excluded from coverage**: `src/components/mermaid.tsx`, `src/components/ui/**`, `src/app/**`, `src/i18n/**`

### Documentation System
- **Markdown docs**: All in `docs/` directory (APRS-GUIDE.md, TECHNICAL-SPECS.md, FAQ.md, RESOURCES.md)
- **Rendering**: Server-side with `fs.readFile()` in Next.js pages, client-side with `react-markdown`
- **MarkdownRenderer**: Custom component at `src/components/markdown-renderer.tsx` with:
  - Smooth scroll for anchor links (800ms duration, 96px header offset)
  - External links open in new tab (`target="_blank"`)
  - Mermaid diagram support (dynamically loaded)
  - Window checks for test compatibility: `if (typeof window !== 'undefined')`

## Development Workflow

### Commands You'll Use
```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build - MUST pass before commits
npm test             # Run all tests - MUST have 100% pass rate
npm run test:coverage # Verify coverage thresholds met
npm run lint         # ESLint check
```

### Adding New Features
1. **New UI text**: Add key to ALL 10 files in `messages/*.json` (same structure across all)
2. **New component**: Create `.tsx` + `.test.tsx` in same directory, ensure 100% coverage
3. **New route**: Must use `[locale]` segment, add page under `src/app/[locale]/`
4. **New documentation**: Add `.md` file to `docs/`, create corresponding page in `src/app/[locale]/docs/`

### Build & Deployment
- **Turbopack**: Used in dev mode for faster builds
- **Static generation**: 53 pages pre-rendered at build time
- **Middleware matcher**: Configured for all locale paths in `src/proxy.ts`

## Critical Files & What They Do

- `src/lib/aprs.ts`: Core APRS passcode algorithm (XOR-based, DO NOT MODIFY without tests)
- `src/proxy.ts`: i18n middleware (NOT middleware.ts - naming required by Next.js config)
- `src/i18n/routing.ts`: Defines all supported locales and creates navigation utilities
- `jest.config.ts`: Coverage thresholds and test configuration
- `messages/AGENTS.md`, `src/AGENTS.md`, `docs/AGENTS.md`: Directory-specific AI agent guides

## Common Gotchas

1. **Window checks required**: Any browser API usage MUST check `typeof window !== 'undefined'` for test compatibility
2. **Mermaid imports**: Use dynamic imports with CDN fallback (see `src/components/mermaid.tsx`)
3. **Translation namespacing**: Use `t('key')` not `t('namespace.key')` - namespace set in `useTranslations('namespace')`
4. **Test mocks**: react-markdown, next/dynamic, and mermaid need special mocking (see `markdown-renderer.test.tsx`)
5. **Right-to-left (RTL)**: Arabic locale exists but no special RTL handling in current implementation

## When Modifying Code

- **Before committing**: Run `npm run build` and `npm run test:coverage` - both MUST succeed
- **Adding translations**: Update ALL 10 language files, not just English
- **Changing components**: Update corresponding test file to maintain 100% coverage
- **Documentation changes**: Edit markdown in `docs/`, pages auto-render the content
