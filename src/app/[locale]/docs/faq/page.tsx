import fs from 'fs/promises';
import path from 'path';
  import MarkdownRenderer from '@/components/markdown-renderer';

interface FaqPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;

  // Read the markdown file
  const filePath = path.join(process.cwd(), 'docs', 'FAQ.md');
  const content = await fs.readFile(filePath, 'utf-8');

  return (
      <article>
        <MarkdownRenderer content={content} />
    </article>
  );
}

export async function generateMetadata() {
  return {
    title: 'FAQ - APRS Passcode Generator',
    description:
        'Frequently asked questions and troubleshooting for APRS Passcode Generator.',
  };
}
