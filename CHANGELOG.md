# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2025-12-09

### Added

- **Complete i18n Implementation** - Full internationalization across the entire project
  - Translated all UI elements including documentation pages
  - Added `home` and `docs` translation namespaces to all 10 languages
  - Documentation section with translated titles and descriptions
  - Translated navigation menu in documentation layout
  - Footer with attribution in all languages

### Changed

- **Documentation Layout** - Now uses `useTranslations` hook for dynamic content
  - Title changes based on selected language
  - Navigation labels translate automatically
  - "Back to Generator" button translated
- **Home Page** - Fully internationalized with `DocumentationSection` component
  - Documentation cards with icons (BookOpen, FileText, Link2, HelpCircle)
  - Translated headings and descriptions
  - Attribution footer in all languages

### Technical Details

- All 10 languages now support:
  - Main generator interface (existing)
  - Documentation navigation
  - Documentation page titles and descriptions
  - Footer attribution text

## [2.1.0] - 2025-12-09

### Added

- **Documentation Pages** - Integrated markdown documentation as navigable web pages
  - APRS Guide page (`/docs/aprs-guide`)
  - Technical Specifications page (`/docs/technical-specs`)
  - Resources page (`/docs/resources`)
  - FAQ page (`/docs/faq`)
- **Documentation Navigation** - Sidebar navigation with active state highlighting
- **Markdown Rendering** - Full GitHub-flavored markdown support with `react-markdown`
- **Documentation Links** - Added documentation cards on home page with icons
- **Project Attribution** - Credited Simon Weber (DO3SWW) and original Web-Aprs-Passcode project
  - Updated README with proper attribution
  - Added contributors field in package.json
  - Footer attribution on home page

### Changed

- **Documentation Structure** - Converted standalone markdown files to web pages
- **Home Page Layout** - Added documentation section with visual cards
- **Global Styles** - Enhanced markdown content styling with proper typography

## [2.0.0] - 2025-12-09

### 🎉 Major Release - Complete Rewrite

Complete migration from Vue.js to Next.js 16 with modern architecture and internationalization.

**Based on:** [Web-Aprs-Passcode](https://github.com/DO3SWW/Web-Aprs-Passcode) by Simon Weber (DO3SWW)

### Added

- **Next.js 16 App Router** implementation
- **shadcn-ui** component library integration
- **Internationalization (i18n)** with next-intl
- **10 Language Support:**
  - English (en)
  - Spanish (es)
  - Chinese (zh)
  - Hindi (hi)
  - Arabic (ar)
  - Portuguese (pt)
  - Bengali (bn)
  - Russian (ru)
  - Japanese (ja)
  - French (fr)
- **Language Switcher** component for easy language selection
- **Comprehensive Documentation:**
  - APRS Guide with frequencies for 50+ countries
  - Technical Specifications document
  - Resources and links compilation
  - Contributing guidelines
- **100% Test Coverage** for core functionality
  - Unit tests for APRS algorithm
  - Component tests with React Testing Library
  - 25 test cases
- **Modern UI/UX:**
  - Responsive design for all devices
  - Accessible components (WCAG 2.1 AA)
  - Dark/light mode support via shadcn-ui
  - RTL language support (Arabic)
- **TypeScript** strict mode throughout
- **MIT License** - Open source
- **CI/CD Ready** configuration
- **SEO Optimized** with proper metadata

### Changed

- **Architecture:** Migrated from Vue.js to React with Next.js
- **Styling:** From basic CSS to Tailwind CSS
- **Build System:** Webpack to Turbopack
- **State Management:** Vue reactivity to React hooks
- **Component Library:** Custom components to shadcn-ui

### Technical Improvements

- **Performance:**
  - Server-side rendering (SSR)
  - Static generation for improved performance
  - Optimized bundle size
  - Image optimization with next/image
  
- **Code Quality:**
  - TypeScript strict mode
  - ESLint configuration
  - Prettier formatting
  - Jest for testing
  
- **Developer Experience:**
  - Hot module replacement
  - Better error messages
  - Type safety
  - Comprehensive documentation

### Fixed

- **APRS Algorithm:** Verified against official specification
- **Passcode Generation:** Handles edge cases correctly
- **Input Validation:** Proper callsign format checking

## [1.0.0] - Original Release

### Initial Features

- Basic APRS passcode generation
- Simple Vue.js implementation
- Single language (English)
- Basic HTML/CSS styling

---

## Migration Guide (1.x → 2.0)

### For Users

No changes needed - the application works the same way:
1. Enter your callsign
2. Click "Get Passcode"
3. Receive your APRS-IS passcode

### New Features Available

- **Language Selection:** Choose from 10 languages via the language switcher
- **Mobile Optimized:** Better experience on phones and tablets
- **Faster Loading:** Improved performance with Next.js
- **Better Accessibility:** Screen reader support and keyboard navigation

### For Developers

Complete rewrite with modern stack:

```bash
# Old stack
Vue.js 3 + Vite

# New stack
Next.js 16 + React 19 + TypeScript + Tailwind CSS + shadcn-ui
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup.

---

## Versioning Strategy

- **Major (X.0.0):** Breaking changes, major features
- **Minor (0.X.0):** New features, backwards compatible
- **Patch (0.0.X):** Bug fixes, minor improvements

---

**Links:**
- [GitHub Repository](https://github.com/carrilloapps/web-aprs-passcode)
- [Issue Tracker](https://github.com/carrilloapps/web-aprs-passcode/issues)
- [Contributing Guide](CONTRIBUTING.md)
