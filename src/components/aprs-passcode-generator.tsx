'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { generateAprsPasscode } from '@/lib/aprs';

export function AprsPasscodeGenerator() {
  const t = useTranslations('app');
  const [callsign, setCallsign] = useState('');
  const [passcode, setPasscode] = useState<number | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = generateAprsPasscode(callsign);

    if (result === null) {
      alert(t('invalidCallsign'));
      setCallsign('');
      setPasscode(null);
    } else {
      setPasscode(result);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          {t('description')}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="callsign">{t('callsignLabel')}</Label>
            <Input
              id="callsign"
              type="text"
              value={callsign}
              onChange={(e) => setCallsign(e.target.value)}
              required
              className="uppercase"
            />
          </div>
          <Button type="submit" className="w-full">
            {t('generateButton')}
          </Button>
          {passcode !== null && (
            <p className="text-center text-lg font-bold">
              {t('passcodeLabel')}: {passcode}
            </p>
          )}
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t('sourceCode')}{' '}
          <a
            href="https://github.com/carrilloapps/web-aprs-passcode"
            title={t('github')}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            {t('github')}
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
