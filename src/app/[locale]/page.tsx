import { getTranslations } from 'next-intl/server';
import { AprsPasscodeGenerator } from '@/components/aprs-passcode-generator';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { DocumentationSection } from '@/components/documentation-section';
import Link from 'next/link';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('home');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-4 md:p-24">
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <ThemeToggle />
        <LanguageSwitcher locale={locale} />
      </div>
      
      <AprsPasscodeGenerator />
      
      <DocumentationSection locale={locale} t={t} />

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>
          {t('basedOn')}{' '}
          <Link
            href="https://github.com/DO3SWW/Web-Aprs-Passcode"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Web-Aprs-Passcode
          </Link>{' '}
          {t('by')} Simon Weber (DO3SWW)
        </p>
      </footer>
    </main>
  );
}
