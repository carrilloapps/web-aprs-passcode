import Link from 'next/link';
import { BookOpen, FileText, Link2, HelpCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface DocCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

function DocCard({ icon, title, description, href }: DocCardProps) {
  return (
    <Link href={href} className="block transition-transform hover:scale-105">
      <Card className="h-full hover:border-primary/50 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">{icon}</div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

interface DocumentationSectionProps {
  locale: string;
  t: (key: string) => string;
}

export function DocumentationSection({ locale, t }: DocumentationSectionProps) {
  const docs = [
    {
      icon: <BookOpen className="w-5 h-5 text-primary" />,
      title: t('aprsGuide'),
      description: t('aprsGuideDescription'),
      href: `/${locale}/docs/aprs-guide`,
    },
    {
      icon: <FileText className="w-5 h-5 text-primary" />,
      title: t('technicalSpecs'),
      description: t('technicalSpecsDescription'),
      href: `/${locale}/docs/technical-specs`,
    },
    {
      icon: <Link2 className="w-5 h-5 text-primary" />,
      title: t('resources'),
      description: t('resourcesDescription'),
      href: `/${locale}/docs/resources`,
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-primary" />,
      title: t('faq'),
      description: t('faqDescription'),
      href: `/${locale}/docs/faq`,
    },
  ];

  return (
    <section className="w-full max-w-6xl mt-16">
      <h2 className="text-3xl font-bold text-center mb-4">{t('documentation')}</h2>
      <p className="text-muted-foreground text-center mb-8">
        {t('documentationDescription')}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {docs.map((doc) => (
          <DocCard key={doc.href} {...doc} />
        ))}
      </div>
    </section>
  );
}
