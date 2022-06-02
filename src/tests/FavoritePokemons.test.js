import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
        ...render(<Router history={history}>{component}</Router>), history,
    });
};

describe(' Testa o arquivo FavoritePokemons', () => {
    test('Testa se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.', () => {
        const { getByText } = renderWithRouter(<App />);
        const FavoritePokemons = getByText('Favorite Pokémons');
        fireEvent.click(FavoritePokemons);
        const element = getByText('No favorite pokemon found');
        expect(element).toBeInTheDocument();
    });

    test('Testa se é exibido todos os cards de pokémons favoritados', () => {
        const { getByText, queryByLabelText, queryByText } = renderWithRouter(<App />);
        const moreDetails = getByText('More details');
        fireEvent.click(moreDetails);
        const checkbox = queryByLabelText('Pokémon favoritado?');
        fireEvent.click(checkbox);

        const home = queryByText('Home');
        fireEvent.click(home);
        const buttonNext = queryByText('Próximo pokémon');
        fireEvent.click(buttonNext);
        const buttonDetailsCharmander = queryByText('More details');
        fireEvent.click(buttonDetailsCharmander);
        const checkboxCharmander = queryByLabelText('Pokémon favoritado?');
        fireEvent.click(checkboxCharmander);

        const favoritePokemon = queryByText('Favorite Pokémons');
        fireEvent.click(favoritePokemon);
        const pikachu = queryByText('Pikachu');
        expect(pikachu).toBeInTheDocument();
        const charmander = getByText('Charmander');
        expect(charmander).toBeInTheDocument();
    });

    test('Testa se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
        const { getByText } = renderWithRouter(<App />);
        const pikachu = getByText('Pikachu');
        expect(pikachu).toBeInTheDocument();
        const favoritePokemon = getByText('Favorite Pokémons');
        fireEvent.click(favoritePokemon);
        expect(pikachu).not.toBeInTheDocument();
    });
});
