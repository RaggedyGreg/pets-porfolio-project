import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';

// Mock the useFetch hook since we're using mock data
jest.mock('../../hooks/useFetch', () => ({
  useFetch: () => {
    return {
      data: {
        rows: [
          {
            id: 1,
            name: 'Max',
            kind: 'dog',
            weight: 25000,
            height: 60,
            length: 90,
            photo_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
            description: 'A friendly dog'
          },
          {
            id: 2,
            name: 'Luna',
            kind: 'cat',
            weight: 4500,
            height: 25,
            length: 45,
            photo_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
            description: 'An elegant cat',
            number_of_lives: 7
          },
          {
            id: 3,
            name: 'Tweety',
            kind: 'bird',
            weight: 150,
            height: 15,
            length: 20,
            photo_url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
            description: 'A cheerful bird',
            wingspan: 35,
            num_of_feathers: 3000
          },
        ],
        totalCount: 3
      },
      loading: false,
      error: null
    };
  }
}));

describe('Home component', () => {
  test('renders pet list correctly', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for pets to load and check they're displayed
    await waitFor(() => {
      expect(screen.getByText('Max')).toBeInTheDocument();
    });
    expect(screen.getByText('Luna')).toBeInTheDocument();
    expect(screen.getByText('Tweety')).toBeInTheDocument();
  });

  test('search field is rendered and accepts input', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    // Find search field
    const searchInput = screen.getByPlaceholderText(/search pets by name/i);
    expect(searchInput).toBeInTheDocument();
    
    // Type in search field
    fireEvent.change(searchInput, { target: { value: 'Max' } });
    expect(searchInput).toHaveValue('Max');
  });

  test('filter chips are rendered and can be clicked', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText('Max')).toBeInTheDocument();
    });

    // Find filter chips
    const dogChip = screen.getByText('Dogs');
    const catChip = screen.getByText('Cats');
    const birdChip = screen.getByText('Birds');
    const clearAllChip = screen.getByText('Clear All');

    expect(dogChip).toBeInTheDocument();
    expect(catChip).toBeInTheDocument();
    expect(birdChip).toBeInTheDocument();
    expect(clearAllChip).toBeInTheDocument();

    // Verify chips are clickable
    fireEvent.click(dogChip);
    // After clicking, the chip should be in an active state (implementation detail varies)
  });

  test('table rows have proper tabIndex for keyboard navigation', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for pets to load
    await waitFor(() => {
      expect(screen.getByText('Max')).toBeInTheDocument();
    });

    // Find the first table row (Max) and verify it's keyboard accessible
    const maxRow = screen.getByRole('button', { name: /Max.*dog/i });
    expect(maxRow).toBeInTheDocument();
    expect(maxRow).toHaveAttribute('tabIndex', '0');
  });

  test('has proper ARIA labels for accessibility', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    // Check search field has role and aria-label (available immediately)
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('aria-label', 'Search pets by name');

    // Check filter group has proper structure
    const filterGroup = screen.getByRole('group', { name: /filter pets by type/i });
    expect(filterGroup).toBeInTheDocument();

    // Check filter chips have proper labels
    const dogChip = screen.getByText('Dogs');
    expect(dogChip).toBeInTheDocument();
  });
});
