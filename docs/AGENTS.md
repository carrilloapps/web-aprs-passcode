# Documentation Directory

## Purpose

This directory contains all comprehensive documentation for the APRS Passcode Generator project in Markdown format.

## What Belongs Here

### ✅ Should be in this directory:

- **APRS-GUIDE.md** - Complete APRS guide with frequencies, explanations, and getting started information
- **TECHNICAL-SPECS.md** - Technical specifications including protocol details, packet structure, and hardware interfaces
- **RESOURCES.md** - Curated collection of APRS resources, tools, software, and learning materials
- **FAQ.md** - Frequently asked questions covering all aspects of APRS and the application
- **README.md** - Documentation index and navigation guide
- **AGENTS.md** - This file, explaining the directory structure and contents

### ❌ Should NOT be in this directory:

- Source code files (.ts, .tsx, .js)
- Configuration files (package.json, tsconfig.json)
- Component files
- Test files
- Build artifacts
- Temporary files

## How It Works

### File Structure

```
docs/
├── AGENTS.md              # This file - directory documentation
├── README.md              # Documentation index and guide
├── APRS-GUIDE.md          # Complete APRS guide
├── TECHNICAL-SPECS.md     # Technical specifications
├── RESOURCES.md           # Curated resources
└── FAQ.md                 # Frequently asked questions
```

### Integration with Next.js

All markdown files in this directory are rendered as web pages:

1. **Server-Side Reading**: Next.js page components read these markdown files at build/runtime
2. **React Markdown**: Content is rendered using `react-markdown` with GitHub-flavored markdown support
3. **Dynamic Routing**: Each file maps to a route:
   - `APRS-GUIDE.md` → `/[locale]/docs/aprs-guide`
   - `TECHNICAL-SPECS.md` → `/[locale]/docs/technical-specs`
   - `RESOURCES.md` → `/[locale]/docs/resources`
   - `FAQ.md` → `/[locale]/docs/faq`

### Rendering Flow

```
Markdown File (docs/*.md)
    ↓
Next.js Page Component (src/app/[locale]/docs/*/page.tsx)
    ↓
fs.readFile() - Read markdown content
    ↓
ReactMarkdown Component - Parse and render
    ↓
Styled HTML - Custom CSS classes applied
    ↓
Final Web Page
```

## Content Guidelines

### Format Requirements

- **Markdown**: GitHub-flavored Markdown (GFM)
- **Encoding**: UTF-8
- **Line Endings**: LF (Unix-style)
- **Headings**: Use ATX-style (#, ##, ###)

### Style Guide

- Use proper heading hierarchy (H1 → H2 → H3)
- Include a table of contents for long documents
- Use tables for structured data
- Include code blocks with language identifiers
- Add links to related documentation
- Keep paragraphs concise and readable

### Content Updates

When updating documentation:

1. Edit the markdown file directly
2. Verify markdown syntax is correct
3. Test rendering on the website (dev server)
4. Commit changes to version control
5. No build step required (server-rendered)

## Technical Details

### Dependencies

- **react-markdown**: Main markdown rendering library
- **remark-gfm**: GitHub-flavored markdown support (tables, strikethrough, task lists)

### CSS Styling

Global styles for markdown content defined in `src/app/globals.css`:

```css
.markdown-content { /* Base styles */ }
.markdown-content h1 { /* Heading 1 */ }
.markdown-content h2 { /* Heading 2 */ }
.markdown-content table { /* Tables */ }
.markdown-content code { /* Inline code */ }
.markdown-content pre { /* Code blocks */ }
```

### Performance

- **SSR/SSG**: Pages can be server-rendered or statically generated
- **No Client Bundle**: Markdown parsing happens server-side
- **Fast Loading**: Static files served with minimal overhead

## Maintenance

### Adding New Documentation

1. Create new `.md` file in this directory
2. Create corresponding page component in `src/app/[locale]/docs/`
3. Add navigation link in `src/app/[locale]/docs/layout.tsx`
4. Update `docs/README.md` index
5. Add link on home page if appropriate

### Removing Documentation

1. Delete markdown file from this directory
2. Remove page component from `src/app/[locale]/docs/`
3. Remove navigation link from layout
4. Update `docs/README.md` index

### Quality Checks

Before committing documentation changes:

- [ ] Markdown syntax is valid
- [ ] All links work correctly
- [ ] Code examples are accurate
- [ ] Tables render properly
- [ ] No spelling/grammar errors
- [ ] Consistent formatting

## Best Practices

### Writing Documentation

1. **Be Clear**: Use simple, direct language
2. **Be Comprehensive**: Cover all relevant topics
3. **Be Accurate**: Verify technical details
4. **Be Organized**: Use logical structure and headings
5. **Be Helpful**: Include examples and practical guidance

### Technical Accuracy

- Verify APRS frequencies with official sources
- Cross-reference technical specifications
- Test code examples before including them
- Update outdated information promptly
- Include version information where relevant

### User Focus

- Write for both beginners and experts
- Include step-by-step instructions
- Provide troubleshooting guidance
- Link to external resources
- Answer common questions

## Related Files

- `/CONTRIBUTING.md` - Contribution guidelines
- `/README.md` - Main project README
- `/CHANGELOG.md` - Version history
- `/LICENSE` - MIT license

## Credits

Documentation structure and content created for the APRS Passcode Generator project.

**Based on:** [Web-Aprs-Passcode](https://github.com/DO3SWW/Web-Aprs-Passcode) by Simon Weber (DO3SWW)

---

**Last Updated:** December 2025  
**Maintained By:** José Carrillo (m@carrillo.app)
