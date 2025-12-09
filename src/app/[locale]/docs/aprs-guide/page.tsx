import fs from 'fs/promises';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AprsGuidePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function AprsGuidePage({ params }: AprsGuidePageProps) {
  const { locale } = await params;

  // Read the markdown file
  const filePath = path.join(process.cwd(), 'docs', 'APRS-GUIDE.md');
  const content = await fs.readFile(filePath, 'utf-8');

  return (
    <article className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}

export async function generateMetadata() {
  return {
    title: 'APRS Guide - APRS Passcode Generator',
    description:
      'Comprehensive guide to APRS (Automatic Packet Reporting System) including frequencies by country, how it works, and getting started.',
  };
}
