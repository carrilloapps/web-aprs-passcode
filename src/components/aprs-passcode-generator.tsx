'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { generateAprsPasscode } from '@/lib/aprs';
import { Radio, Copy, CheckCircle2, AlertCircle, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AprsPasscodeGenerator() {
  const t = useTranslations('app');
  const [callsign, setCallsign] = useState('');
  const [passcode, setPasscode] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setCopied(false);

    // Simular procesamiento para mostrar animación
    await new Promise(resolve => setTimeout(resolve, 300));

    const result = generateAprsPasscode(callsign);

    if (result === null) {
      setError(t('invalidCallsign'));
      setPasscode(null);
    } else {
      setPasscode(result);
    }
    
    setIsLoading(false);
  };

  const handleCopy = async () => {
    if (passcode !== null) {
      await navigator.clipboard.writeText(passcode.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg border-2 transition-shadow hover:shadow-xl">
      <CardHeader className="space-y-2 pb-4">
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-full bg-primary/10 animate-pulse-slow">
            <Radio className="w-12 h-12 text-primary" aria-hidden="true" />
          </div>
          <div className="flex-1 text-left">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t('title')}
            </CardTitle>
            <CardDescription className="text-base mt-1">
              {t('description')}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label
              htmlFor="callsign"
              className="text-base font-semibold flex items-center gap-2"
            >
              {t('callsignLabel')}
              <span className="text-xs text-muted-foreground font-normal">({t('required')})</span>
            </Label>
            <Input
              id="callsign"
              type="text"
              value={callsign}
              onChange={(e) => {
                setCallsign(e.target.value);
                setError(null);
              }}
              placeholder="K4HCK"
              required
              aria-required="true"
              aria-invalid={error !== null}
              aria-describedby={error ? 'callsign-error' : undefined}
              className={cn(
                "uppercase text-lg h-12 font-mono transition-all",
                error && "border-destructive focus-visible:ring-destructive"
              )}
              disabled={isLoading}
            />
            {error && (
              <div 
                id="callsign-error"
                className="flex items-center gap-2 text-destructive text-sm animate-in fade-in slide-in-from-top-1"
                role="alert"
                aria-live="polite"
              >
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            disabled={isLoading || !callsign.trim()}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⚡</span>
                {t('generating')}
              </>
            ) : (
              t('generateButton')
            )}
          </Button>
        </form>

        {passcode !== null && (
          <div 
            className="p-6 rounded-lg bg-primary/5 border-2 border-primary/20 space-y-4 animate-in fade-in slide-in-from-bottom-2"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {t('passcodeLabel')}
                </p>
                <p className="text-4xl font-bold font-mono tracking-wider text-primary">
                  {passcode}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 transition-all hover:scale-110"
                onClick={handleCopy}
                aria-label={copied ? t('copied') : t('copy')}
                title={copied ? t('copied') : t('copy')}
              >
                {copied ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 animate-in zoom-in" aria-hidden="true" />
                ) : (
                  <Copy className="w-5 h-5" aria-hidden="true" />
                )}
              </Button>
            </div>
            {copied && (
              <p className="text-xs text-green-600 dark:text-green-400 animate-in fade-in">
                ✓ {t('copiedToClipboard')}
              </p>
            )}
          </div>
        )}

        <div className="pt-4 border-t">
          <a
            href="https://github.com/carrilloapps/web-aprs-passcode"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            aria-label={t('viewOnGithub')}
          >
            <span>{t('sourceCode')}</span>
            <Github className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
