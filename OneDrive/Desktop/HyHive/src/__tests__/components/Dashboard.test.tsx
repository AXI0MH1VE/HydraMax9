import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from '../../components/Dashboard';

describe('Dashboard Component', () => {
  it('renders without crashing', () => {
    render(<Dashboard />);
    expect(screen.getByText(/AXIOM HIVE/i)).toBeInTheDocument();
  });

  it('displays sidebar navigation', () => {
    render(<Dashboard />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders performance monitor', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Performance/i)).toBeInTheDocument();
  });

  it('switches between different views', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    
    const tacticalButton = screen.getByText(/Tactical/i);
    await user.click(tacticalButton);
    
    expect(screen.getByText(/Security Module/i)).toBeInTheDocument();
  });
});
