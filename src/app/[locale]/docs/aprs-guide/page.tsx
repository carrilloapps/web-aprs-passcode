import fs from 'fs/promises';
import path from 'path';
import MarkdownRenderer from '@/components/markdown-renderer';

interface AprsGuidePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function AprsGuidePage({ params }: AprsGuidePageProps) {
  const { locale } = await params;

  const filePath = path.join(process.cwd(), 'docs', 'APRS-GUIDE.md');
  const content = await fs.readFile(filePath, 'utf-8');

  return (
    <article>
      <MarkdownRenderer content={content} />
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
