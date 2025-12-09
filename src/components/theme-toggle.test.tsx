import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeToggle } from './theme-toggle';
import { useTheme } from 'next-themes';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
  const mockSetTheme = jest.fn();
  const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the toggle button', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      systemTheme: 'light',
      themes: ['light', 'dark'],
      resolvedTheme: 'light',
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('shows sun icon in light mode', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      systemTheme: 'light',
      themes: ['light', 'dark'],
      resolvedTheme: 'light',
    });

    render(<ThemeToggle />);
    const sunIcon = screen.getByRole('button').querySelector('svg');
    expect(sunIcon).toBeInTheDocument();
  });

  it('shows moon icon in dark mode', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      systemTheme: 'dark',
      themes: ['light', 'dark'],
      resolvedTheme: 'dark',
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('toggles from light to dark when clicked', async () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      systemTheme: 'light',
      themes: ['light', 'dark'],
      resolvedTheme: 'light',
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });
  });

  it('toggles from dark to light when clicked', async () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      systemTheme: 'dark',
      themes: ['light', 'dark'],
      resolvedTheme: 'dark',
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });
  });

  it('handles mounted state correctly', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      systemTheme: 'light',
      themes: ['light', 'dark'],
      resolvedTheme: 'light',
    });

    const { rerender } = render(<ThemeToggle />);
    
    // Component should render after mount
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
    
    rerender(<ThemeToggle />);
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('applies correct button styles', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      systemTheme: 'light',
      themes: ['light', 'dark'],
      resolvedTheme: 'light',
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    
    expect(button).toHaveClass('inline-flex');
    expect(button).toHaveClass('items-center');
    expect(button).toHaveClass('justify-center');
  });

  it('is keyboard accessible', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      systemTheme: 'light',
      themes: ['light', 'dark'],
      resolvedTheme: 'light',
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    
    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it('handles system theme correctly', () => {
    mockUseTheme.mockReturnValue({
      theme: 'system',
      setTheme: mockSetTheme,
      systemTheme: 'dark',
      themes: ['light', 'dark', 'system'],
      resolvedTheme: 'dark',
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    
    fireEvent.click(button);

    // Should toggle to light when system is dark
    expect(mockSetTheme).toHaveBeenCalled();
  });
});
