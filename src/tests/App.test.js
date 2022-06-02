import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Page home rendering app in URL', () => {
  const { getByText } = renderWithRouter(<App />);
  const title = getByText(/Encountered pokémons/i);
  expect(title).toBeInTheDocument();
});

test('Top bar contains Home navigation link', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const searchHome = getByText(/Home/i);
  expect(searchHome).toBeInTheDocument();
  fireEvent.click(searchHome);

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Top bar contains About navigation link', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const searchAbout = getByText(/About/i);
  expect(searchAbout).toBeInTheDocument();
  fireEvent.click(searchAbout);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Top bar contains Favorite navigation link', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const searchFavorite = getByText(/Favorite/i);
  expect(searchFavorite).toBeInTheDocument();
  fireEvent.click(searchFavorite);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});