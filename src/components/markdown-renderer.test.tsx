import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MarkdownRenderer from './markdown-renderer';

// Mock Mermaid component
jest.mock('./mermaid', () => ({
  __esModule: true,
  default: ({ code }: any) => <div data-testid="mermaid">{code}</div>,
}));

describe('MarkdownRenderer', () => {
  it('renders external links with target _blank', () => {
    render(<MarkdownRenderer content={'[Google](https://google.com)'} />);
    const link = screen.getByRole('link', { name: /Google/i });
    expect(link).toHaveAttribute('href', 'https://google.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders internal anchors and triggers scroll behavior', () => {
    const anchorHtml = '#section\n\n[Go to section](#section)\n\n<div id="section">Section</div>';
    render(<MarkdownRenderer content={anchorHtml} />);
    const link = screen.getByRole('link', { name: /Go to section/i });

    // mock getBoundingClientRect and pageYOffset
    const el = document.getElementById('section') as HTMLElement;
    el.getBoundingClientRect = () => ({ top: 100 } as any);
    window.scrollTo = jest.fn();

    fireEvent.click(link);
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('renders mermaid code blocks via Mermaid component', () => {
    const md = '```mermaid\nflowchart TD; A-->B;\n```';
    render(<MarkdownRenderer content={md} />);
    expect(screen.getByTestId('mermaid')).toHaveTextContent('flowchart TD; A-->B;');
  });
});
