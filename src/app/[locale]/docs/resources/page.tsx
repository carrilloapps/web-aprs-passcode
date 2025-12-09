import fs from 'fs/promises';
import path from 'path';
import MarkdownRenderer from '@/components/markdown-renderer';

interface ResourcesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { locale } = await params;

  // Read the markdown file
  const filePath = path.join(process.cwd(), 'docs', 'RESOURCES.md');
  const content = await fs.readFile(filePath, 'utf-8');

  return (
    <article>
      <MarkdownRenderer content={content} />
    </article>
  );
}

export async function generateMetadata() {
  return {
    title: 'APRS Resources - APRS Passcode Generator',
    description:
      'Curated collection of APRS resources, software tools, hardware, online services, and learning materials.',
  };
}
