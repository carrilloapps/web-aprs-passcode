"use client";

import React, { useEffect, useRef } from 'react';

interface MermaidProps {
  code: string;
}

function loadMermaidFromCdn(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('No window'));
    const w: any = window;
    if (w.mermaid) return resolve(w.mermaid);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/mermaid@10/dist/mermaid.min.js';
    script.async = true;
    script.onload = () => resolve(w.mermaid);
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
}

export default function Mermaid({ code }: MermaidProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    loadMermaidFromCdn()
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
