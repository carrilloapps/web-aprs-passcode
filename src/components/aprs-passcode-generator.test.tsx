import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AprsPasscodeGenerator } from './aprs-passcode-generator';

jest.mock('next-intl');

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

const renderComponent = () => {
  return render(<AprsPasscodeGenerator />);
};

describe('AprsPasscodeGenerator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with title and description', () => {
    renderComponent();
    
    expect(screen.getByText('APRS Passcode Generator')).toBeInTheDocument();
    expect(screen.getByText('Enter your amateur radio callsign to get a Passcode for the APRS-IS network.')).toBeInTheDocument();
  });

  it('should render callsign input and generate button', () => {
    renderComponent();
    
    const input = screen.getByRole('textbox', { name: /callsign/i });
    const button = screen.getByRole('button', { name: /get passcode/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should generate correct passcode for K4HCK', async () => {
    renderComponent();
    
    const input = screen.getByRole('textbox', { name: /callsign/i });
    const button = screen.getByRole('button', { name: /get passcode/i });

    fireEvent.change(input, { target: { value: 'K4HCK' } });
    
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
    
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/21742|15253/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should show error for invalid callsign', async () => {
    renderComponent();
    
    const input = screen.getByRole('textbox', { name: /callsign/i });
    const button = screen.getByRole('button', { name: /get passcode/i });

    fireEvent.change(input, { target: { value: 'INVALID@CALL' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/invalid callsign/i)).toBeInTheDocument();
    });
  });

  it('should render source code link', () => {
    renderComponent();
    
    const link = screen.getByRole('link', { name: /view/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/carrilloapps/web-aprs-passcode');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should update passcode when different valid callsigns are entered', async () => {
    renderComponent();
    
    const input = screen.getByRole('textbox', { name: /callsign/i });
    const button = screen.getByRole('button', { name: /get passcode/i });

    fireEvent.change(input, { target: { value: 'TEST' } });
    fireEvent.click(button);

    await waitFor(() => {
      const passcodeText = screen.getByText(/\d{4,5}/);
      expect(passcodeText).toBeInTheDocument();
    }, { timeout: 2000 });

    fireEvent.change(input, { target: { value: 'N0CALL' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/13023/)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should handle form submission with enter key', async () => {
    renderComponent();
    
    const input = screen.getByRole('textbox', { name: /callsign/i });

    fireEvent.change(input, { target: { value: 'N0CALL' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('13023')).toBeInTheDocument();
    });
  });

  it('should apply uppercase class to input', () => {
    renderComponent();
    
    const input = screen.getByRole('textbox', { name: /callsign/i });
    expect(input).toHaveClass('uppercase');
  });

  it('should have copy button when passcode is displayed', async () => {
    renderComponent();
    
    const input = screen.getByRole('textbox', { name: /callsign/i });
    const button = screen.getByRole('button', { name: /get passcode/i });

    fireEvent.change(input, { target: { value: 'K4HCK' } });
    fireEvent.click(button);

    await waitFor(() => {
      const copyButton = screen.getByRole('button', { name: /copy/i });
      expect(copyButton).toBeInTheDocument();
    });
  });

  it('should copy passcode to clipboard', async () => {
    renderComponent();
    
    const input = screen.getByRole('textbox', { name: /callsign/i });
    const button = screen.getByRole('button', { name: /get passcode/i });

    fireEvent.change(input, { target: { value: 'K4HCK' } });
    fireEvent.click(button);

    const copyButton = await waitFor(() => {
      return screen.getByRole('button', { name: /copy/i });
    }, { timeout: 2000 });
    
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });

  it('should show loading state while generating', async () => {
    renderComponent();
    
    const input = screen.getByRole('textbox', { name: /callsign/i });
    const button = screen.getByRole('button', { name: /get passcode/i });

    fireEvent.change(input, { target: { value: 'K4HCK' } });
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveTextContent(/generating/i);
  });

  it('should disable button when input is empty', () => {
    renderComponent();
    
    const button = screen.getByRole('button', { name: /get passcode/i });
    expect(button).toBeDisabled();
  });

  it('should have proper accessibility attributes', () => {
    renderComponent();
    
    const input = screen.getByRole('textbox', { name: /callsign/i });
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).toHaveAttribute('placeholder', 'K4HCK');
  });

  it('should update aria-invalid when error occurs', async () => {
    renderComponent();
    
    const input = screen.getByRole('textbox', { name: /callsign/i });
    const button = screen.getByRole('button', { name: /get passcode/i });

    fireEvent.change(input, { target: { value: 'INVALID@' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('should clear error when user starts typing', async () => {
    renderComponent();
    
    const input = screen.getByRole('textbox', { name: /callsign/i });
    const button = screen.getByRole('button', { name: /get passcode/i });

    // Generate error first
    fireEvent.change(input, { target: { value: 'INVALID@' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    // Clear by typing
    fireEvent.change(input, { target: { value: 'TEST' } });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should show copied confirmation after copying', async () => {
    renderComponent();
    
    const input = screen.getByRole('textbox', { name: /callsign/i });
    const submitButton = screen.getByRole('button', { name: /get passcode/i });

    fireEvent.change(input, { target: { value: 'K4HCK' } });
    fireEvent.click(submitButton);

    const copyButton = await waitFor(() => {
      return screen.getByRole('button', { name: /copy/i });
    }, { timeout: 2000 });
    
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText(/copied/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
