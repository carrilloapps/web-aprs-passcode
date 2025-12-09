# Contributing to APRS Passcode Generator

Thank you for your interest in contributing to the APRS Passcode Generator! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

If you find a bug or have a suggestion:

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (browser, OS, etc.)

### Submitting Changes

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
   ```bash
   git commit -m "Add: feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

## 📋 Development Guidelines

### Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Functional components with hooks
- **Naming**:
  - Components: PascalCase
  - Functions: camelCase
  - Constants: UPPER_SNAKE_CASE
  - Files: kebab-case
- **Comments**: Use JSDoc for functions
- **Formatting**: Use project's ESLint and Prettier configs

### File Structure

```
src/
├── app/              # Next.js pages
├── components/       # React components
├── lib/             # Utility functions
└── i18n/            # Internationalization
```

### Testing Requirements

All contributions must include tests:

- **Unit tests** for utilities and functions
- **Component tests** for React components
- **Coverage**: Maintain >95% coverage
- **Run tests**: `npm test`
- **Coverage report**: `npm run test:coverage`

Example test structure:

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });

  it('should handle user interaction', () => {
    // Test implementation
  });
});
```

### Internationalization (i18n)

When adding new text:

1. Add keys to ALL language files in `/messages`
2. Use `useTranslations` hook
3. Keep translations concise
4. Consider cultural context

Example:

```typescript
// Add to all JSON files
{
  "app": {
    "newKey": "English text"
  }
}

// Use in component
const t = useTranslations('app');
<p>{t('newKey')}</p>
```

## 🌍 Translation Contributions

We welcome translations! To add or improve translations:

1. Locate the language file in `/messages`
2. Update the JSON with accurate translations
3. Maintain the same structure as `en.json`
4. Test the translation in the app
5. Submit a PR with your changes

### Translation Guidelines

- **Accuracy**: Ensure technical terms are correct
- **Context**: Consider amateur radio terminology
- **Brevity**: Keep translations concise
- **Consistency**: Use consistent terminology
- **Native speaker**: Ideally contributed by native speakers

## 🐛 Bug Fixes

When fixing bugs:

1. **Identify the root cause**
2. **Create a failing test** that demonstrates the bug
3. **Fix the issue**
4. **Verify the test passes**
5. **Update documentation** if needed

## ✨ New Features

Before implementing a new feature:

1. **Open an issue** to discuss the feature
2. **Get feedback** from maintainers
3. **Design the implementation**
4. **Implement with tests**
5. **Update documentation**
6. **Submit PR**

### Feature Checklist

- [ ] Issue created and discussed
- [ ] Code implemented
- [ ] Tests added (>95% coverage)
- [ ] Documentation updated
- [ ] i18n keys added for all languages
- [ ] Build passes (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] No linting errors (`npm run lint`)

## 📚 Documentation

Documentation improvements are always welcome:

- **README.md**: Main project overview
- **docs/APRS-GUIDE.md**: APRS information
- **docs/TECHNICAL-SPECS.md**: Technical details
- **docs/RESOURCES.md**: Links and resources
- **Code comments**: Inline documentation

### Documentation Standards

- **Clear language**: Easy to understand
- **Examples**: Include code examples
- **Links**: Reference official sources
- **Accuracy**: Verify all information
- **Formatting**: Use proper Markdown

## 🔍 Code Review Process

All contributions go through code review:

1. **Automated checks**: Must pass CI/CD
2. **Maintainer review**: Code quality and design
3. **Testing verification**: Tests must pass
4. **Documentation check**: Docs must be updated
5. **Approval**: At least one maintainer approval

## 🏗️ Development Setup

### Prerequisites

- Node.js 20.x or higher
- npm, pnpm, or yarn
- Git

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/web-aprs-passcode.git
cd web-aprs-passcode

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build production
npm run build
```

### Environment Variables

No environment variables are currently required for development.

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Writing Tests

- **Test file location**: Next to the file being tested
- **Naming**: `*.test.ts` or `*.test.tsx`
- **Structure**: Describe blocks for organization
- **Coverage**: Aim for 100% coverage

Example:

```typescript
import { generateAprsPasscode } from './aprs';

describe('generateAprsPasscode', () => {
  it('should generate correct passcode for valid callsign', () => {
    expect(generateAprsPasscode('N0CALL')).toBe(13023);
  });

  it('should return null for invalid callsign', () => {
    expect(generateAprsPasscode('INVALID@')).toBeNull();
  });
});
```

## 📦 Dependencies

### Adding Dependencies

When adding new dependencies:

1. **Justify the need**: Why is this dependency necessary?
2. **Check bundle size**: Keep the app lightweight
3. **Review license**: Ensure MIT-compatible
4. **Security check**: No known vulnerabilities
5. **Update documentation**: Note any new requirements

### Dependency Guidelines

- **Prefer lightweight alternatives**
- **Avoid duplicate functionality**
- **Keep dependencies up to date**
- **Use exact versions** for critical packages

## 🎨 UI/UX Contributions

When contributing to UI:

1. **Follow shadcn-ui patterns**
2. **Maintain accessibility** (WCAG 2.1 AA)
3. **Test responsive design** (mobile, tablet, desktop)
4. **Support RTL languages** (Arabic)
5. **Test in multiple browsers**

### Accessibility Requirements

- **Keyboard navigation**: All features accessible via keyboard
- **Screen readers**: Proper ARIA labels
- **Color contrast**: Meet WCAG standards
- **Focus indicators**: Visible focus states

## 🔒 Security

### Reporting Security Issues

**Do NOT open public issues for security vulnerabilities.**

Instead:

1. Email: jose.carrillo@yummysuperapp.com
2. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Security Guidelines

- **No sensitive data** in code or commits
- **Validate all inputs**
- **Sanitize user data**
- **Keep dependencies updated**
- **Follow OWASP best practices**

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🏅 Recognition

Contributors will be:

- Listed in the project's contributors
- Mentioned in release notes (for significant contributions)
- Credited in documentation (where applicable)

## 💬 Communication

- **GitHub Issues**: Bug reports and feature requests
- **Pull Requests**: Code contributions
- **Discussions**: General questions and ideas

## 📋 Commit Message Guidelines

Follow conventional commits:

```
type(scope): subject

body

footer
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(i18n): add German language support

Add German translations for all UI strings
Update language switcher to include German

Closes #123

fix(aprs): correct passcode generation for odd-length callsigns

The algorithm was not handling odd-length callsigns correctly
when processing the last character.

Fixes #456

docs(readme): update installation instructions

Add troubleshooting section for common Node.js issues
```

## 🎯 Priority Areas

Current priorities for contributions:

1. **Translations**: More language support
2. **Documentation**: Expand APRS guides
3. **Tests**: Increase coverage
4. **Accessibility**: Improve a11y
5. **Mobile UX**: Enhance mobile experience

## ❓ Questions?

If you have questions:

1. Check existing [documentation](README.md)
2. Search [existing issues](https://github.com/carrilloapps/web-aprs-passcode/issues)
3. Open a new issue with the `question` label

---

Thank you for contributing to the APRS Passcode Generator! 🎉

**Maintained by:** José Carrillo  
**License:** MIT  
**Last Updated:** December 2025
