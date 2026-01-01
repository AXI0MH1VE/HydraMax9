import { render, screen, waitFor } from '@testing-library/react';
import BootstrapSequence from '../../components/BootstrapSequence';

describe('BootstrapSequence Component', () => {
  it('renders initialization message', () => {
    render(<BootstrapSequence onComplete={() => {}} />);
    expect(screen.getByText(/AXIOM HIVE/i)).toBeInTheDocument();
  });

  it('calls onComplete after initialization', async () => {
    const mockOnComplete = jest.fn();
    render(<BootstrapSequence onComplete={mockOnComplete} />);
    
    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalled();
    }, { timeout: 5000 });
  });

  it('displays loading progress', () => {
    render(<BootstrapSequence onComplete={() => {}} />);
    expect(screen.getByText(/STATE_VECTOR_LOADING/i)).toBeInTheDocument();
  });
});
