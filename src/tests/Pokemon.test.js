import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

test('Pokemon name rendering on screen', () => {
  const { getByText } = renderWithRouter(<App />);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
  expect(pikachu.innerHTML).toBe('Pikachu');
});

test('Rendering the correct type pokemon', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const pokemonType = getByTestId('pokemonType');
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonType.innerHTML).toBe('Electric');
});

test('Average weight rendering on screen', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const pikachuAverage = getByTestId('pokemon-weight');
  expect(pikachuAverage).toBeInTheDocument();
  expect(pikachuAverage.innerHTML).toBe('Average weight: 6.0 kg');
});

test('Image source and alt pokemon is on screen ', () => {
  const { container } = renderWithRouter(<App />);
  const altPikachu = container.querySelector('img').alt;
  const srcPikachu = container.querySelector('img').src;
  expect(altPikachu).toBe('Pikachu sprite');
  expect(srcPikachu).not.toBe('');
});
test('Card pokemon contains more details and go to new page', () => {
  const { getByText } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/i);
  fireEvent.click(moreDetails);
  const summary = getByText(/Summary/i);
  expect(summary).toBeInTheDocument();
});
test('More details rendering url `/pokemon/<id>`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/i);
  fireEvent.click(moreDetails);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});
test('There is star icon on favorite pokemons', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/i);
  fireEvent.click(moreDetails);
  const favoritePokemon = getByText(/Pokémon favoritado?/i);
  fireEvent.click(favoritePokemon);
  const urlSrcIcon = container.querySelector('.favorite-icon').src;
  const sixteen = 16;
  const srcIcon = urlSrcIcon.substring(sixteen);
  expect(srcIcon).toBe('/star-icon.svg');
});
test('The icon alt is <pokemon>', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/i);
  fireEvent.click(moreDetails);
  const altIcon = container.querySelector('.favorite-icon').alt;
  expect(altIcon).toBe('Pikachu is marked as favorite');
});