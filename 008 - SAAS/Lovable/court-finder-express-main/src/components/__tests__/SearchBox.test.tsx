
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageContext } from '../../App';
import SearchBox from '../SearchBox';
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

describe('SearchBox Component', () => {
  it('renders the search box with the correct label', () => {
    render(
      <LanguageContext.Provider value={{ language: 'en', setLanguage: vi.fn() }}>
        <BrowserRouter>
          <SearchBox />
        </BrowserRouter>
      </LanguageContext.Provider>
    );
    
    expect(screen.getByLabelText(/Enter a court or tribunal name, town, city or postcode/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Find/i })).toBeInTheDocument();
  });

  it('displays error when form is submitted without input', () => {
    render(
      <LanguageContext.Provider value={{ language: 'en', setLanguage: vi.fn() }}>
        <BrowserRouter>
          <SearchBox />
        </BrowserRouter>
      </LanguageContext.Provider>
    );
    
    const submitButton = screen.getByRole('button', { name: /Find/i });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/Please enter a town, city or postcode/i)).toBeInTheDocument();
  });

  it('allows input to be entered', () => {
    render(
      <LanguageContext.Provider value={{ language: 'en', setLanguage: vi.fn() }}>
        <BrowserRouter>
          <SearchBox />
        </BrowserRouter>
      </LanguageContext.Provider>
    );
    
    const input = screen.getByLabelText(/Enter a court or tribunal name, town, city or postcode/i);
    fireEvent.change(input, { target: { value: 'London' } });
    
    expect(input).toHaveValue('London');
  });
});
