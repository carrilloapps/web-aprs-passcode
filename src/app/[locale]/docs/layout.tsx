'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { Waves, BookOpen, FileText, Link2, HelpCircle, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAV_ITEMS = [
    { href: '/docs/aprs-guide', label: t('aprsGuide'), icon: BookOpen },
    { href: '/docs/technical-specs', label: t('technicalSpecs'), icon: FileText },
    { href: '/docs/resources', label: t('resources'), icon: Link2 },
    { href: '/docs/faq', label: t('faq'), icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
            <Waves className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="hidden sm:inline">{tApp('title')}</span>
            <span className="sm:hidden">APRS</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <ThemeToggle />
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 relative">
          {/* Mobile menu overlay */}
          {mobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={cn(
            "w-64 shrink-0 transition-all duration-300",
            "lg:block",
            mobileMenuOpen 
              ? "fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-background border-r z-50 p-4" 
              : "hidden"
          )}>
            <nav className="sticky top-24 space-y-1">
              <h2 className="font-semibold mb-4 text-lg px-2">{t('navigation')}</h2>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname.endsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-all group',
                      isActive
                        ? 'bg-primary text-primary-foreground font-medium shadow-md'
                        : 'hover:bg-accent/70 hover:translate-x-1'
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 transition-transform",
                      isActive ? "scale-110" : "group-hover:scale-110"
                    )} aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="pt-4 mt-4 border-t">
                <Link
                  href={`/${locale}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/70 transition-all hover:translate-x-1 group"
                >
                  <Home className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <span>{t('backToGenerator')}</span>
                </Link>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 max-w-none lg:max-w-4xl">
            <article className="markdown-content prose prose-neutral dark:prose-invert max-w-none">
              {children}
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
