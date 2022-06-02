import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import { describe } from 'eslint/lib/rule-tester/rule-tester';

const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
        ...render(<Router history={history}>{component}</Router>), history,
    });
};

describe('Testa o arquivo PokemonDetails', () => {
    test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
        const { queryByText } = renderWithRouter(<App />);
        const btn = queryByText(/More details/i);
        fireEvent.click(btn);

        const pokemonDetails = queryByText(/Details/i);
        expect(pokemonDetails).toBeInTheDocument();
        expect(pokemonDetails.innerHTML).toBe('Pikachu Details');
        const paragraph = queryByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
        expect(paragraph).toBeInTheDocument();
    });

    test('Testa se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
        const { queryByText, container } = renderWithRouter(<App />);
        const moreDetails = queryByText(/More details/i);
        fireEvent.click(moreDetails);

        const imageMaps = container.querySelectorAll('img');
        const three = 3;
        expect(imageMaps.length).toBe(three);
    });

    test('Testa que não tem o link "Mais detalhes" na página de detalhes', () => {
        const { getByText } = renderWithRouter(<App />);
        const btnMoreDetails = getByText("More details");
        fireEvent.click(btnMoreDetails);
        expect(btnMoreDetails).not.toBeInTheDocument();
    });

    test('Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
        const { queryByText, container } = renderWithRouter(<App />);
        const moreDetails = queryByText(/More details/i);
        fireEvent.click(moreDetails);

        const favoritePokemon = queryByText(/Pokémon favoritado?/i);
        fireEvent.click(favoritePokemon);
        const urlIcon = container.querySelector('.favorite-icon');
        expect(urlIcon).toBeInTheDocument();
        expect(urlIcon.src).toBe('http://localhost/star-icon.svg');

        fireEvent.click(favoritePokemon);
        expect(urlIcon).not.toBeInTheDocument();
    });
});


