"use client";

import React, { useEffect, useRef } from 'react';

interface MermaidProps {
  code: string;
}

async function loadMermaid(): Promise<any> {
  if (typeof window === 'undefined') throw new Error('No window');

  const w: any = window;
  if (w.mermaid) return w.mermaid;

  // Try dynamic import first (if installed locally)
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mod = await import('mermaid');
    const mer = mod.default || mod;
    w.mermaid = mer;
    return mer;
  } catch (err) {
    // Fallback to CDN
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/mermaid@10/dist/mermaid.min.js';
      script.async = true;
      script.onload = () => resolve(w.mermaid);
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
  }
}

export default function Mermaid({ code }: MermaidProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    loadMermaid()
      .then((mermaid) => {
        if (!mounted || !ref.current) return;
        try {
          mermaid.initialize({ startOnLoad: false, theme: 'dark' });
          mermaid.render(`mermaid-${Math.random().toString(36).slice(2, 9)}`, code, (svgCode: string) => {
            if (ref.current) ref.current.innerHTML = svgCode;
          });
        } catch (err) {
          if (ref.current) ref.current.innerText = String(err);
        }
      })
      .catch((err) => {
        if (ref.current) ref.current.innerText = 'Mermaid failed to load';
      });

    return () => {
      mounted = false;
    };
  }, [code]);

  return <div ref={ref} className="mermaid" />;
}
