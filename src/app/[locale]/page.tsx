import { getTranslations } from 'next-intl/server';
import { AprsPasscodeGenerator } from '@/components/aprs-passcode-generator';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { DocumentationSection } from '@/components/documentation-section';
import Link from 'next/link';
import { Waves } from 'lucide-react';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('home');

  return (
    <>
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <main className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Waves className="w-6 h-6 text-primary" aria-hidden="true" />
              <span className="font-bold text-lg hidden sm:inline">APRS Passcode</span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher locale={locale} />
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-12 p-4 md:p-8 lg:p-12">
          <div className="w-full max-w-7xl mx-auto space-y-12">
            {/* Hero section */}
            <section className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <AprsPasscodeGenerator />
            </section>

            {/* Documentation section */}
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <DocumentationSection locale={locale} t={t} />
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                {t('basedOn')}{' '}
                <Link
                  href="https://github.com/DO3SWW/Web-Aprs-Passcode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground transition-colors font-medium"
                >
                  Web-Aprs-Passcode
                </Link>{' '}
                {t('by')} Simon Weber (DO3SWW)
              </p>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} APRS Passcode Generator. MIT License.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
