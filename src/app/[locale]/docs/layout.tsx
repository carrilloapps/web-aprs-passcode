'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

interface DocsLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default function DocsLayout({ children, params }: DocsLayoutProps) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('docs');
  const tApp = useTranslations('app');

  const NAV_ITEMS = [
    { href: '/docs/aprs-guide', label: t('aprsGuide') },
    { href: '/docs/technical-specs', label: t('technicalSpecs') },
    { href: '/docs/resources', label: t('resources') },
    { href: '/docs/faq', label: t('faq') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold hover:underline">
            {tApp('title')}
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-64 shrink-0">
            <nav className="sticky top-24 space-y-1">
              <h2 className="font-semibold mb-4 text-lg">{t('navigation')}</h2>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname.endsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    className={cn(
                      'block px-4 py-2 rounded-md transition-colors',
                      isActive
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'hover:bg-accent/50'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-4 mt-4 border-t">
                <Link
                  href={`/${locale}`}
                  className="block px-4 py-2 rounded-md hover:bg-accent/50 transition-colors"
                >
                  {t('backToGenerator')}
                </Link>
              </div>
            </nav>
          </aside>

          <main className="flex-1 max-w-4xl">
            <div className="markdown-content">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
