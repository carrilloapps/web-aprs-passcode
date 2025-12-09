import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(next-intl|use-intl)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/**',
    '!src/proxy.ts',
    '!src/components/ui/**',
    '!src/components/mermaid.tsx',
    '!src/i18n/**',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 80,
      lines: 95,
      statements: 95,
    },
  },
};

export default createJestConfig(config);
