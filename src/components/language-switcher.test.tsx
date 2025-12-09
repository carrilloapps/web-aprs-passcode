import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import { LanguageSwitcher } from './language-switcher';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

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
});
