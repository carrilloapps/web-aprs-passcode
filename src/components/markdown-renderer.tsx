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
      // In-page anchor: smooth scroll
      if (href.startsWith('#')) {
        return (
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              const id = href.replace('#', '');
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
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
