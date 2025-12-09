import React from 'react';

export const NextIntlClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const useTranslations = (namespace?: string) => {
  return (key: string) => {
    const mockTranslations: Record<string, Record<string, string>> = {
      app: {
        title: 'APRS Passcode Generator',
        description: 'Enter your amateur radio callsign to get a Passcode for the APRS-IS network.',
        callsignLabel: 'Callsign',
        generateButton: 'Get Passcode!',
        passcodeLabel: 'Your Passcode',
        invalidCallsign: 'Invalid Callsign, Try Again!',
        sourceCode: 'Source Code on',
        github: 'Github',
      },
    };
    return mockTranslations[namespace || 'app']?.[key] || key;
  };
};

export const useLocale = () => 'en';
export const useFormatter = () => ({});
export const useMessages = () => ({});
export const useNow = () => new Date();
export const useTimeZone = () => 'UTC';
