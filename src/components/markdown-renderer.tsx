"use client";

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import dynamic from 'next/dynamic';

const Mermaid = dynamic(() => import('./mermaid'), { ssr: false });

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const components = useMemo(() => ({
    a: ({ href, children }: any) => {
      if (!href) return <a>{children}</a>;
      // In-page anchor: smooth scroll with offset and slower duration
      if (href.startsWith('#')) {
        return (
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              const id = href.replace('#', '');
              const el = document.getElementById(id);
              if (!el) return;

              const headerOffset = 96; // px, adjust if header height differs
              const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
              const targetPosition = elementPosition - headerOffset;
              const startPosition = window.pageYOffset;
              const distance = targetPosition - startPosition;
              const duration = 800; // ms, slower animation
              let start: number | null = null;

              function step(timestamp: number) {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic-like
                if (typeof window !== 'undefined') {
                  window.scrollTo(0, startPosition + distance * ease);
                  if (elapsed < duration) window.requestAnimationFrame(step);
                }
              }

              if (typeof window !== 'undefined') {
                window.requestAnimationFrame(step);
              }
            }}
          >
            {children}
          </a>
        );
      }

      // External links open in new tab
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>
          {children}
        </a>
      );
    },
    code: ({ inline, className, children, ...props }: any) => {
      const code = String(children).replace(/\n$/, '');
      const match = /language-(\w+)/.exec(className || '');
      const lang = match ? match[1] : '';

      if (lang === 'mermaid') {
        return <Mermaid code={code} />;
      }

      if (inline) return <code className={className}>{code}</code>;

      return (
        <pre className={className}>
          <code {...props}>{code}</code>
        </pre>
      );
    },
  }), []);

  return (
    <div className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
