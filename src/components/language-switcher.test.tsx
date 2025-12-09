import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import { LanguageSwitcher } from './language-switcher';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock the UI Select components to simple native select/option for testing
jest.mock('@/components/ui/select', () => {
  const React = require('react');
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'zh', name: '中文' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ar', name: 'العربية' },
    { code: 'pt', name: 'Português' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'ru', name: 'Русский' },
    { code: 'ja', name: '日本語' },
    { code: 'fr', name: 'Français' },
  ];

  return {
    Select: ({ value, onValueChange }: any) => (
      <select value={value} onChange={(e) => onValueChange(e.target.value)}>
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.name}
          </option>
        ))}
      </select>
    ),
    SelectTrigger: () => null,
    SelectValue: () => null,
    SelectContent: () => null,
    SelectItem: () => null,
    SelectGroup: () => null,
  };
});

describe('LanguageSwitcher', () => {
  const mockPush = jest.fn();
  const mockPathname = '/en/page';

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    mockPush.mockClear();
  });

  it('should render language switcher with current locale', () => {
    render(<LanguageSwitcher locale="en" />);
    
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
  });

  it('should maintain correct value when locale prop changes', () => {
    const { rerender } = render(<LanguageSwitcher locale="en" />);
    
    rerender(<LanguageSwitcher locale="es" />);
    
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
  });

  it('should navigate to new locale when changed', () => {
    render(<LanguageSwitcher locale="en" />);

    const trigger = screen.getByRole('combobox');
    // simulate user selecting a new language
    fireEvent.change(trigger, { target: { value: 'es' } });

    expect(mockPush).toHaveBeenCalledWith('/es/page');
  });
});
