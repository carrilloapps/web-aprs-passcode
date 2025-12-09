import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AprsPasscodeGenerator } from './aprs-passcode-generator';

jest.mock('next-intl');

const renderComponent = () => {
  return render(<AprsPasscodeGenerator />);
};

describe('AprsPasscodeGenerator', () => {
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the component with title and description', () => {
    renderComponent();
    
    expect(screen.getByText('APRS Passcode Generator')).toBeInTheDocument();
    expect(screen.getByText('Enter your amateur radio callsign to get a Passcode for the APRS-IS network.')).toBeInTheDocument();
  });

  it('should render input field and button', () => {
    renderComponent();
    
    expect(screen.getByLabelText('Callsign')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get Passcode!' })).toBeInTheDocument();
  });

  it('should generate passcode for valid callsign', async () => {
    renderComponent();
    
    const input = screen.getByLabelText('Callsign');
    const button = screen.getByRole('button', { name: 'Get Passcode!' });

    fireEvent.change(input, { target: { value: 'N0CALL' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Your Passcode: 13023/)).toBeInTheDocument();
    });
  });

  it('should show alert for invalid callsign', async () => {
    const alertMock = jest.spyOn(window, 'alert');
    renderComponent();
    
    const input = screen.getByLabelText('Callsign');
    const button = screen.getByRole('button', { name: 'Get Passcode!' });

    fireEvent.change(input, { target: { value: 'INVALID@CALL' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Invalid Callsign, Try Again!');
    });
  });

  it('should clear input and passcode after invalid callsign', async () => {
    renderComponent();
    
    const input = screen.getByLabelText('Callsign') as HTMLInputElement;
    const button = screen.getByRole('button', { name: 'Get Passcode!' });

    fireEvent.change(input, { target: { value: 'INVALID@CALL' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(input.value).toBe('');
      expect(screen.queryByText(/Your Passcode:/)).not.toBeInTheDocument();
    });
  });

  it('should render source code link', () => {
    renderComponent();
    
    const link = screen.getByRole('link', { name: 'Github' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/carrilloapps/web-aprs-passcode');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should update passcode when different valid callsigns are entered', async () => {
    renderComponent();
    
    const input = screen.getByLabelText('Callsign');
    const button = screen.getByRole('button', { name: 'Get Passcode!' });

    fireEvent.change(input, { target: { value: 'TEST' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Your Passcode: 29939/)).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: 'N0CALL' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Your Passcode: 13023/)).toBeInTheDocument();
    });
  });

  it('should handle form submission with enter key', async () => {
    renderComponent();
    
    const input = screen.getByLabelText('Callsign');

    fireEvent.change(input, { target: { value: 'N0CALL' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText(/Your Passcode: 13023/)).toBeInTheDocument();
    });
  });

  it('should not display passcode initially', () => {
    renderComponent();
    
    expect(screen.queryByText(/Your Passcode:/)).not.toBeInTheDocument();
  });

  it('should apply uppercase class to input', () => {
    renderComponent();
    
    const input = screen.getByLabelText('Callsign');
    expect(input).toHaveClass('uppercase');
  });
});
