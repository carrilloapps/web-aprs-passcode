/** @jest-environment jsdom */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock react-markdown to avoid ESM parsing issues in Jest
jest.mock('react-markdown', () => {
  const React = require('react');
  return ({ children, components }: any) => {
    const s = String(children || '');

    // mermaid code block
    const mer = /```mermaid\n([\s\S]*?)\n```/.exec(s);
    if (mer) {
      const code = mer[1];
      const Code = components?.code;
      return React.createElement('div', null, Code ? React.createElement(Code, { className: 'language-mermaid' }, code) : React.createElement('code', null, code));
    }

    // regular code block ```lang\ncode\n```
    const codeBlock = /```(\w+)?\n([\s\S]*?)\n```/.exec(s);
    if (codeBlock) {
      const lang = codeBlock[1] || '';
      const code = codeBlock[2];
      const Code = components?.code;
      return React.createElement('div', null, Code ? React.createElement(Code, { className: lang ? `language-${lang}` : '' }, code) : React.createElement('pre', null, React.createElement('code', null, code)));
    }

    // inline code `code`
    const inlineCode = /`([^`]+)`/.exec(s);
    if (inlineCode) {
      const code = inlineCode[1];
      const Code = components?.code;
      const before = s.substring(0, inlineCode.index);
      const after = s.substring(inlineCode.index! + inlineCode[0].length);
      return React.createElement('div', null, 
        before,
        Code ? React.createElement(Code, { inline: true }, code) : React.createElement('code', null, code),
        after
      );
    }

    // external link [Text](https://...)
    const ext = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/.exec(s);
    if (ext) {
      const [, text, href] = ext;
      const A = components?.a;
      return React.createElement('div', null, A ? React.createElement(A, { href }, text) : React.createElement('a', { href }, text));
    }

    // relative link [Text](/path)
    const rel = /\[([^\]]+)\]\((\/[^)]+)\)/.exec(s);
    if (rel) {
      const [, text, href] = rel;
      const A = components?.a;
      return React.createElement('div', null, A ? React.createElement(A, { href }, text) : React.createElement('a', { href }, text));
    }

    // internal anchor [Text](#id)
    const anchor = /\[([^\]]+)\]\((#[^)]+)\)/.exec(s);
    if (anchor) {
      const [, text, href] = anchor;
      const A = components?.a;
      return React.createElement('div', null, A ? React.createElement(A, { href }, text) : React.createElement('a', { href }, text));
    }

    return React.createElement('div', null, s);
  };
});

jest.mock('remark-gfm', () => null);
jest.mock('rehype-raw', () => null);

// Mock Mermaid component
jest.mock('./mermaid', () => ({
  __esModule: true,
  default: ({ code }: any) => React.createElement('div', { 'data-testid': 'mermaid' }, code),
}));

// Mock next/dynamic to return the mocked Mermaid component directly
jest.mock('next/dynamic', () => () => {
  const m = require('./mermaid');
  return m.default || m;
});

import MarkdownRenderer from './markdown-renderer';

describe('MarkdownRenderer', () => {
  beforeEach(() => {
    // Setup window mocks for each test
    Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
    window.scrollTo = jest.fn();
    window.requestAnimationFrame = jest.fn((cb) => {
      cb(0);
      return 0;
    });
  });

  it('renders external links with target _blank', () => {
    render(<MarkdownRenderer content={'[Google](https://google.com)'} />);
    const link = screen.getByRole('link', { name: /Google/i });
    expect(link).toHaveAttribute('href', 'https://google.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders relative links without target', () => {
    render(<MarkdownRenderer content={'[About](/about)'} />);
    const link = screen.getByRole('link', { name: /About/i });
    expect(link).toHaveAttribute('href', '/about');
    expect(link).not.toHaveAttribute('target');
  });

  it('renders internal anchors and triggers scroll behavior', () => {
    const anchorHtml = '[Go to section](#section)';
    
    // Create target element in the document
    const target = document.createElement('div');
    target.id = 'section';
    target.textContent = 'Section';
    document.body.appendChild(target);

    // Mock getBoundingClientRect
    target.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));

    render(<MarkdownRenderer content={anchorHtml} />);
    const link = screen.getByRole('link', { name: /Go to section/i });

    fireEvent.click(link);
    
    expect(window.scrollTo).toHaveBeenCalled();
    
    // Cleanup
    document.body.removeChild(target);
  });

  it('renders mermaid code blocks via Mermaid component', () => {
    const md = '```mermaid\nflowchart TD; A-->B;\n```';
    render(<MarkdownRenderer content={md} />);
    expect(screen.getByTestId('mermaid')).toHaveTextContent('flowchart TD; A-->B;');
  });

  it('renders inline code correctly', () => {
    const md = 'This is `inline code` in text';
    const { container } = render(<MarkdownRenderer content={md} />);
    expect(container.querySelector('code')).toBeInTheDocument();
  });

  it('renders regular code blocks', () => {
    const md = '```javascript\nconst x = 1;\n```';
    const { container } = render(<MarkdownRenderer content={md} />);
    expect(container.querySelector('pre')).toBeInTheDocument();
  });

  it('handles anchor links without target element gracefully', () => {
    const anchorHtml = '[Go to missing](#missing-section)';
    const { container } = render(<MarkdownRenderer content={anchorHtml} />);
    const link = screen.getByRole('link', { name: /Go to missing/i });
    
    // Click should not throw error even if element doesn't exist
    expect(() => fireEvent.click(link)).not.toThrow();
  });
});
