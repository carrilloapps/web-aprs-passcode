import Link from 'next/link';
import { BookOpen, FileText, Link2, HelpCircle, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface DocCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  index: number;
}

function DocCard({ icon, title, description, href, index }: DocCardProps) {
  return (
    <Link 
      href={href} 
      className="group block h-full animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 bg-card/50 backdrop-blur">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
              {icon}
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              {description}
            </CardDescription>
          </div>
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
      icon: <BookOpen className="w-6 h-6 text-primary" aria-hidden="true" />,
      title: t('aprsGuide'),
      description: t('aprsGuideDescription'),
      href: `/${locale}/docs/aprs-guide`,
    },
    {
      icon: <FileText className="w-6 h-6 text-primary" aria-hidden="true" />,
      title: t('technicalSpecs'),
      description: t('technicalSpecsDescription'),
      href: `/${locale}/docs/technical-specs`,
    },
    {
      icon: <Link2 className="w-6 h-6 text-primary" aria-hidden="true" />,
      title: t('resources'),
      description: t('resourcesDescription'),
      href: `/${locale}/docs/resources`,
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-primary" aria-hidden="true" />,
      title: t('faq'),
      description: t('faqDescription'),
      href: `/${locale}/docs/faq`,
    },
  ];

  return (
    <section className="w-full" aria-labelledby="documentation-heading">
      <div className="text-center space-y-4 mb-10">
        <h2 
          id="documentation-heading"
          className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
        >
          {t('documentation')}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t('documentationDescription')}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {docs.map((doc, index) => (
          <DocCard key={doc.href} {...doc} index={index} />
        ))}
      </div>
    </section>
  );
}
