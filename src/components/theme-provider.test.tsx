import { render } from '@testing-library/react';
import { ThemeProvider } from './theme-provider';

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children, ...props }: any) => (
    <div data-testid="theme-provider" {...props}>
      {children}
    </div>
  ),
}));

describe('ThemeProvider', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('wraps children with ThemeProvider', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );

    expect(getByTestId('theme-provider')).toBeInTheDocument();
  });

  it('passes props to ThemeProvider', () => {
    const { getByTestId } = render(
      <ThemeProvider attribute="class" defaultTheme="system">
        <div>Test Content</div>
      </ThemeProvider>
    );

    const provider = getByTestId('theme-provider');
    expect(provider).toHaveAttribute('attribute', 'class');
    expect(provider).toHaveAttribute('defaultTheme', 'system');
  });

  it('renders multiple children', () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </ThemeProvider>
    );

    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
    expect(getByText('Child 3')).toBeInTheDocument();
  });

  it('handles empty children', () => {
    const { container } = render(<ThemeProvider>{null}</ThemeProvider>);
    expect(container.querySelector('[data-testid="theme-provider"]')).toBeInTheDocument();
  });

  it('handles fragment children', () => {
    const { getByText } = render(
      <ThemeProvider>
        <>
          <div>Fragment Child 1</div>
          <div>Fragment Child 2</div>
        </>
      </ThemeProvider>
    );

    expect(getByText('Fragment Child 1')).toBeInTheDocument();
    expect(getByText('Fragment Child 2')).toBeInTheDocument();
  });

  it('preserves child component props', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <div data-testid="child" className="test-class" id="test-id">
          Test
        </div>
      </ThemeProvider>
    );

    const child = getByTestId('child');
    expect(child).toHaveClass('test-class');
    expect(child).toHaveAttribute('id', 'test-id');
  });
});
