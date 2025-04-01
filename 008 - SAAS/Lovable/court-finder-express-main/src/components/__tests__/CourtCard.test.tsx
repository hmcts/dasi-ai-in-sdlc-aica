
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CourtCard from '../CourtCard';

describe('CourtCard Component', () => {
  const mockCourt = {
    id: "1",
    slug: "manchester-civil-justice-centre",
    name: "Manchester Civil Justice Centre",
    address: ["1 Bridge Street", "Manchester"],
    town: "Manchester",
    postcode: "M60 9DJ",
    phoneNumber: "0161 830 5000",
    courtTypes: ["County Court", "Family Court"],
    areasOfLaw: ["Money claims", "Housing", "Divorce"]
  };

  it('renders court details correctly', () => {
    render(
      <BrowserRouter>
        <CourtCard court={mockCourt} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Manchester Civil Justice Centre')).toBeInTheDocument();
    expect(screen.getByText('1 Bridge Street')).toBeInTheDocument();
    expect(screen.getByText('Manchester')).toBeInTheDocument();
    expect(screen.getByText('M60 9DJ')).toBeInTheDocument();
    expect(screen.getByText('Telephone: 0161 830 5000')).toBeInTheDocument();
    expect(screen.getByText('Full details for this court')).toBeInTheDocument();
    
    // Check that the link to the court details page exists
    const link = screen.getByRole('link', { name: 'Manchester Civil Justice Centre' });
    expect(link).toHaveAttribute('href', '/courts/manchester-civil-justice-centre');
  });
});
