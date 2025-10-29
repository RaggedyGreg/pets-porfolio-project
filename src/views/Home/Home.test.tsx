import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Home } from './Home';

const server = setupServer(
  rest.get('https://my-json-server.typicode.com/Feverup/fever_pets_data/pets', (req, res, ctx) => {
    return res(
      ctx.json({
        totalCount: 2,
        rows: [
            {
                id: 1,
                name: 'Fluffy',
                kind: 'dog',
                weight: '10kg',
                height: '50cm',
                length: '100cm',
                photo_url: 'https://example.com/fluffy.jpg',
              },
              {
                id: 2,
                name: 'Fluffy2',
                kind: 'dog',
                weight: '10kg',
                height: '50cm',
                length: '100cm',
                photo_url: 'https://example.com/fluffy.jpg',
              },
          // Add more mock data as needed
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Home component', () => {
  test('renders loading beforetable ', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
   
  }); 
});
