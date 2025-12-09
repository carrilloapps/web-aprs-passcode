# APRS Passcode Generator

A modern web application for generating passcodes for the APRS-IS (Automatic Packet Reporting System - Internet Service) network with your amateur radio callsign.

Built with **Next.js 16**, **shadcn-ui**, and **next-intl** for internationalization.

> **Based on:** [Web-Aprs-Passcode](https://github.com/DO3SWW/Web-Aprs-Passcode) by Simon Weber (DO3SWW)  
> This project is a complete modernization with Next.js 16, internationalization, comprehensive documentation, and extensive testing.

## 🌍 Supported Languages

The application supports the 10 most spoken languages in the world:

- 🇬🇧 English
- 🇪🇸 Spanish (Español)
- 🇨🇳 Chinese (中文)
- 🇮🇳 Hindi (हिन्दी)
- 🇸🇦 Arabic (العربية)
- 🇧🇷 Portuguese (Português)
- 🇧🇩 Bengali (বাংলা)
- 🇷🇺 Russian (Русский)
- 🇯🇵 Japanese (日本語)
- 🇫🇷 French (Français)

## ✨ Features

- 🚀 Built with Next.js 16 App Router
- 🎨 Modern UI with shadcn-ui components
- 🌐 Internationalization (i18n) with next-intl
- 📱 Fully responsive design
- ♿ Accessible components
- 🧪 100% test coverage for core functionality
- ⚡ Type-safe with TypeScript

## 🛠️ Tech Stack

- **Framework:** Next.js 16
- **UI Library:** shadcn-ui (Radix UI primitives)
- **Styling:** Tailwind CSS
- **i18n:** next-intl
- **Language:** TypeScript
- **Testing:** Jest + React Testing Library
- **Linting:** ESLint

## 📦 Installation

### Prerequisites

- Node.js 20.x or higher
- npm, pnpm, or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/carrilloapps/web-aprs-passcode.git
cd web-aprs-passcode

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📁 Project Structure

```
web-aprs-passcode/
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.tsx       # Locale-specific layout
│   │       └── page.tsx          # Home page
│   ├── components/
│   │   ├── ui/                   # shadcn-ui components
│   │   ├── aprs-passcode-generator.tsx
│   │   └── language-switcher.tsx
│   ├── i18n/
│   │   ├── request.ts            # i18n request configuration
│   │   └── routing.ts            # i18n routing configuration
│   ├── lib/
│   │   ├── aprs.ts               # APRS passcode generation logic
│   │   └── utils.ts              # Utility functions
│   └── middleware.ts             # Next.js middleware for i18n
├── messages/                      # Translation files
│   ├── en.json
│   ├── es.json
│   ├── zh.json
│   ├── hi.json
│   ├── ar.json
│   ├── pt.json
│   ├── bn.json
│   ├── ru.json
│   ├── ja.json
│   └── fr.json
├── public/                        # Static assets
├── jest.config.ts                 # Jest configuration
├── jest.setup.ts                  # Jest setup file
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

## 🧪 Testing

The project has comprehensive test coverage for all core functionality:

- **Unit tests** for APRS passcode generation algorithm
- **Component tests** for UI components
- **Coverage threshold:** 95% statements, 95% lines, 100% branches, 80% functions

Run tests:

```bash
npm test
```

View coverage report:

```bash
npm run test:coverage
```

## 📚 Documentation

Comprehensive APRS documentation is available in the `/docs` directory:

- **[APRS Guide](docs/APRS-GUIDE.md)** - Complete guide to APRS including:
  - What is APRS and how it works
  - Frequencies by country (50+ countries)
  - APRS-IS network details
  - Equipment requirements and recommendations
  - Getting started guide
  - Use cases and applications
  
- **[Technical Specifications](docs/TECHNICAL-SPECS.md)** - Detailed technical documentation:
  - Protocol specifications (AX.25, AFSK)
  - Packet structure and formats
  - Performance metrics and ranges
  - Hardware interface specifications
  - Network capacity and timing

- **[Resources](docs/RESOURCES.md)** - Curated links and resources:
  - Software tools and applications
  - Hardware recommendations
  - Online services and communities
  - Learning resources and tutorials

- **[FAQ](docs/FAQ.md)** - Frequently Asked Questions:
  - General APRS questions
  - Technical troubleshooting
  - Setup and configuration help
  - Privacy and legal considerations

See also:
- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[SECURITY.md](SECURITY.md)** - Security policy

## 🌐 How It Works

The APRS passcode is generated using the following algorithm:

1. The callsign is converted to uppercase
2. A temporary code starts at `29666`
3. For each pair of characters in the callsign:
   - XOR the temporary code with the first character's ASCII value × 256
   - XOR the temporary code with the second character's ASCII value
4. Apply a bitwise AND with `32767` to get the final passcode

This implementation matches the official APRS-IS passcode algorithm.

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this software for any purpose, including commercial applications.

## 👨‍💻 Author

**José Carrillo** (m@carrillo.app)  
HJ4JPC - Ham Radio Amateur

## 🔗 Links

- [GitHub Repository](https://github.com/carrilloapps/web-aprs-passcode)
- [Original Project](https://github.com/DO3SWW/web-aprs-passcode)
- [APRS.fi](https://aprs.fi) - Global APRS tracking
- [APRS.org](http://www.aprs.org) - Official APRS website

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

Areas where we need help:
- Additional language translations
- Documentation improvements
- Bug fixes and feature enhancements
- Testing and code reviews

## 🙏 Acknowledgments

- Based on the original APRS Passcode Generator by DO3SWW
- Bob Bruninga (WB4APR) - Creator of APRS
- APRS-IS Network developers and maintainers
- Amateur Radio community worldwide
- All contributors to this project

---

Made with ❤️ for the Amateur Radio community
