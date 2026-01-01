import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Component', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders bootstrap sequence initially', () => {
    render(<App />);
    expect(screen.getByText(/AXIOM HIVE/i)).toBeInTheDocument();
  });

  it('shows dashboard after boot is complete', async () => {
    sessionStorage.setItem('hydra_booted', 'true');
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText(/Initializing/i)).not.toBeInTheDocument();
    });
  });

  it('persists boot state in sessionStorage', () => {
    render(<App />);
    expect(sessionStorage.getItem('hydra_booted')).toBeTruthy();
  });

  it('applies correct background styling', () => {
    const { container } = render(<App />);
    const appDiv = container.firstChild;
    expect(appDiv).toHaveClass('min-h-screen', 'bg-[#020202]', 'text-[#06af6e]');
  });
});
