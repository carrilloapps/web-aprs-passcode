import { render, screen } from '@testing-library/react';
import { DocumentationSection } from './documentation-section';

// Mock Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('DocumentationSection', () => {
  const mockT = (key: string): string => {
    const translations: Record<string, string> = {
      documentation: 'Documentation',
      documentationDescription: 'Explore our comprehensive guides',
      aprsGuide: 'APRS Guide',
      aprsGuideDescription: 'Complete guide to APRS',
      technicalSpecs: 'Technical Specifications',
      technicalSpecsDescription: 'Detailed technical information',
      resources: 'Resources',
      resourcesDescription: 'Useful links and tools',
      faq: 'FAQ',
      faqDescription: 'Frequently asked questions',
    };
    return translations[key] || key;
  };

  const defaultProps = {
    locale: 'en',
    t: mockT,
  };

  it('renders the documentation section', () => {
    render(<DocumentationSection {...defaultProps} />);
    
    expect(screen.getByText('Documentation')).toBeInTheDocument();
  });

  it('renders all documentation cards', () => {
    render(<DocumentationSection {...defaultProps} />);
    
    expect(screen.getByText('APRS Guide')).toBeInTheDocument();
    expect(screen.getByText('Technical Specifications')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders card descriptions', () => {
    render(<DocumentationSection {...defaultProps} />);
    
    expect(screen.getByText('Complete guide to APRS')).toBeInTheDocument();
    expect(screen.getByText('Detailed technical information')).toBeInTheDocument();
    expect(screen.getByText('Useful links and tools')).toBeInTheDocument();
    expect(screen.getByText('Frequently asked questions')).toBeInTheDocument();
  });

  it('renders correct links with locale prefix', () => {
    const { container } = render(<DocumentationSection {...defaultProps} />);
    
    const links = container.querySelectorAll('a');
    expect(links[0]).toHaveAttribute('href', '/en/docs/aprs-guide');
    expect(links[1]).toHaveAttribute('href', '/en/docs/technical-specs');
    expect(links[2]).toHaveAttribute('href', '/en/docs/resources');
    expect(links[3]).toHaveAttribute('href', '/en/docs/faq');
  });

  it('works with different locales', () => {
    const { container } = render(<DocumentationSection locale="es" t={mockT} />);
    
    const links = container.querySelectorAll('a');
    expect(links[0]).toHaveAttribute('href', '/es/docs/aprs-guide');
    expect(links[1]).toHaveAttribute('href', '/es/docs/technical-specs');
  });

  it('renders icons for all cards', () => {
    const { container } = render(<DocumentationSection {...defaultProps} />);
    
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThanOrEqual(4); // One icon per card (plus potential card icons)
  });

  it('applies correct card structure', () => {
    render(<DocumentationSection {...defaultProps} />);
    
    const aprsGuideCard = screen.getByText('APRS Guide').closest('div');
    expect(aprsGuideCard).toBeInTheDocument();
    
    const cardDescription = screen.getByText('Complete guide to APRS');
    expect(cardDescription).toBeInTheDocument();
  });

  it('renders in a grid layout', () => {
    const { container } = render(<DocumentationSection {...defaultProps} />);
    
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
  });

  it('has correct heading hierarchy', () => {
    render(<DocumentationSection {...defaultProps} />);
    
    const heading = screen.getByText('Documentation');
    expect(heading.tagName).toBe('H2');
  });

  it('all links are accessible', () => {
    render(<DocumentationSection {...defaultProps} />);
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(4);
    
    links.forEach((link) => {
      expect(link).toHaveAttribute('href');
    });
  });

  it('renders with correct text content', () => {
    render(<DocumentationSection {...defaultProps} />);
    
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('APRS Guide')).toBeInTheDocument();
    expect(screen.getByText('Complete guide to APRS')).toBeInTheDocument();
    expect(screen.getByText('Explore our comprehensive guides')).toBeInTheDocument();
  });

  it('maintains consistent card order', () => {
    const { container } = render(<DocumentationSection {...defaultProps} />);
    
    const links = Array.from(container.querySelectorAll('a'));
    expect(links[0]).toHaveAttribute('href', '/en/docs/aprs-guide');
    expect(links[1]).toHaveAttribute('href', '/en/docs/technical-specs');
    expect(links[2]).toHaveAttribute('href', '/en/docs/resources');
    expect(links[3]).toHaveAttribute('href', '/en/docs/faq');
  });

  it('handles locale prop correctly', () => {
    const { rerender, container } = render(<DocumentationSection locale="en" t={mockT} />);
    let links = container.querySelectorAll('a');
    expect(links[0]).toHaveAttribute('href', '/en/docs/aprs-guide');
    
    rerender(<DocumentationSection locale="fr" t={mockT} />);
    links = container.querySelectorAll('a');
    expect(links[0]).toHaveAttribute('href', '/fr/docs/aprs-guide');
  });

  it('uses translation function for all text', () => {
    const customT = jest.fn((key: string) => `translated_${key}`);
    render(<DocumentationSection locale="en" t={customT} />);
    
    expect(customT).toHaveBeenCalledWith('documentation');
    expect(customT).toHaveBeenCalledWith('documentationDescription');
    expect(customT).toHaveBeenCalledWith('aprsGuide');
    expect(customT).toHaveBeenCalledWith('aprsGuideDescription');
    expect(customT).toHaveBeenCalledWith('technicalSpecs');
    expect(customT).toHaveBeenCalledWith('technicalSpecsDescription');
  });

  it('renders section description', () => {
    render(<DocumentationSection {...defaultProps} />);
    expect(screen.getByText('Explore our comprehensive guides')).toBeInTheDocument();
  });
});

