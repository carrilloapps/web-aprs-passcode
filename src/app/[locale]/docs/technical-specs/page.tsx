import fs from 'fs/promises';
import path from 'path';
import MarkdownRenderer from '@/components/markdown-renderer';

interface TechnicalSpecsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function TechnicalSpecsPage({ params }: TechnicalSpecsPageProps) {
  const { locale } = await params;

  // Read the markdown file
  const filePath = path.join(process.cwd(), 'docs', 'TECHNICAL-SPECS.md');
  const content = await fs.readFile(filePath, 'utf-8');

    return (
      <article>
        <MarkdownRenderer content={content} />
      </article>
    );
}

export async function generateMetadata() {
  return {
    title: 'Technical Specifications - APRS Passcode Generator',
    description:
      'Detailed technical specifications for APRS protocol, modulation, packet structure, and hardware interfaces.',
  };
}
