
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageContext } from '../../App';
import Header from '../Header';

describe('Header Component', () => {
  it('renders the header with GOV.UK branding', () => {
    const setLanguage = vi.fn();
    
    render(
      <LanguageContext.Provider value={{ language: 'en', setLanguage }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </LanguageContext.Provider>
    );
    
    expect(screen.getByText('GOV.UK')).toBeInTheDocument();
    expect(screen.getByText('Find a court or tribunal')).toBeInTheDocument();
    expect(screen.getByText('Cymraeg')).toBeInTheDocument();
  });

  it('toggles language when language button is clicked', () => {
    const setLanguage = vi.fn();
    
    render(
      <LanguageContext.Provider value={{ language: 'en', setLanguage }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </LanguageContext.Provider>
    );
    
    const languageButton = screen.getByText('Cymraeg');
    fireEvent.click(languageButton);
    
    expect(setLanguage).toHaveBeenCalledWith('cy');
  });

  it('displays Welsh text when language is set to Welsh', () => {
    const setLanguage = vi.fn();
    
    render(
      <LanguageContext.Provider value={{ language: 'cy', setLanguage }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </LanguageContext.Provider>
    );
    
    expect(screen.getByText('GOV.UK')).toBeInTheDocument();
    expect(screen.getByText('Dod o hyd i lys neu dribiwnlys')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });
});
