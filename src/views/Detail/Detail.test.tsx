import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Detail } from './Detail';
import { RequestHandler, rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('https://my-json-server.typicode.com/Feverup/fever_pets_data/pets/:id', (req, res, ctx) => {
    const { id } = req.params;
    if (id === 'error') {
      return res(ctx.status(500), ctx.json({ message: 'Error fetching data' }));
    } else {
      return res(
        ctx.json({
          id,
          name: 'Fluffy',
          weight: '1012',
          height: '50',
          length: '100',
          number_of_lives: 4,
          description: 'A fluffy pet',
          kind: 'dog',
          photo_url: 'https://example.com/fluffy.jpg',
        })
      );
    }
  }) as RequestHandler
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Detail component', () => {
  test('renders pet details with loader correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/pets/1']}>
        <Routes>
          <Route path="/pets/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders pet details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/pets/1']}>
        <Routes>
          <Route path="/pets/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Fluffy')).toBeInTheDocument();
      expect(screen.getByText('1012')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('A fluffy pet')).toBeInTheDocument();
      expect(screen.getByRole('bigImage')).toBeInTheDocument();
      expect(screen.getByRole('bigImage')).toBeInTheDocument();
      expect(screen.getByRole('bigImage')).toHaveAttribute('src', 'https://example.com/fluffy.jpg');
      expect(screen.getByRole('bigImage')).toHaveAttribute('height', '200');
      expect(screen.getByRole('health')).toBeInTheDocument(); 
    });
  });

   test('displays error message when data fetching fails', async () => {
    render(
      <MemoryRouter initialEntries={['/pets/error']}>
        <Routes>
          <Route path="/pets/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('noMatch.text')).toBeInTheDocument();
      expect(screen.getByText('noMatch.link')).toBeInTheDocument();
    });
  });
});
