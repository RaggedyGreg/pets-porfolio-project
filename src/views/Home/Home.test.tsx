import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
        ],
        totalCount: 2
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
      expect(screen.getByText('Luna')).toBeInTheDocument();
    });
   
  }); 
});
