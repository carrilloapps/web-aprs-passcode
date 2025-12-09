import fs from 'fs/promises';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
    <article className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}

export async function generateMetadata() {
  return {
    title: 'FAQ - APRS Passcode Generator',
    description:
      'Frequently asked questions about APRS, passcode generation, setup, troubleshooting, and emergency use.',
  };
}
