import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Detail from './Detail';
import * as useFetchDetailModule from '../../hooks/useFetchDetail';

describe('Detail component', () => {
  test('renders pet details with loader correctly', async () => {
    // Mock loading state
    jest.spyOn(useFetchDetailModule, 'useFetchDetail').mockReturnValue({
      data: null,
      loading: true,
      error: null
    });

    render(
      <MemoryRouter initialEntries={['/pets/1']}>
        <Routes>
          <Route path="/pets/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    jest.restoreAllMocks();
  });

  test('renders pet details correctly', async () => {
    // Mock successful data fetch
    jest.spyOn(useFetchDetailModule, 'useFetchDetail').mockReturnValue({
      data: {
        id: 1,
        name: 'Max',
        weight: 25000,
        height: 60,
        length: 90,
        description: 'A friendly and energetic golden retriever who loves to play fetch and swim.',
        kind: 'dog',
        photo_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
      },
      loading: false,
      error: null
    });

    render(
      <MemoryRouter initialEntries={['/pets/1']}>
        <Routes>
          <Route path="/pets/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the main element to load
    const nameElement = await screen.findByText('Max');
    expect(nameElement).toBeInTheDocument();
    
    // Check all other elements are present
    expect(screen.getByText('25000')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();
    expect(screen.getByText('A friendly and energetic golden retriever who loves to play fetch and swim.')).toBeInTheDocument();
    
    const image = screen.getByTestId('bigImage');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400');
    
    expect(screen.getByTestId('health')).toBeInTheDocument();
    
    jest.restoreAllMocks();
  });

  test('displays error message when data fetching fails', async () => {
    // Mock error state
    jest.spyOn(useFetchDetailModule, 'useFetchDetail').mockReturnValue({
      data: null,
      loading: false,
      error: 'Pet not found'
    });

    render(
      <MemoryRouter initialEntries={['/pets/999']}>
        <Routes>
          <Route path="/pets/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for error message to appear
    const errorText = await screen.findByText('noMatch.text');
    expect(errorText).toBeInTheDocument();
    expect(screen.getByText('noMatch.link')).toBeInTheDocument();
    
    jest.restoreAllMocks();
  });
});
