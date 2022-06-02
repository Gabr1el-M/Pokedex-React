import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import { describe } from 'eslint/lib/rule-tester/rule-tester';
import { testFlowVersion } from 'eslint-plugin-react/lib/util/version';

const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
        ...render(<Router history={history}>{component}</Router>), history,
    });
};

describe('Testa o arquivo Pokedex', () => {
    test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
        const { getByTestId, getByText } = renderWithRouter(<App />);
        const buttonNextPokemon = getByTestId('next-pokemon');
        expect(buttonNextPokemon.innerHTML).toBe('Próximo pokémon');

        fireEvent.click(buttonNextPokemon);
        const charmander = getByText(/Charmander/i);
        expect(charmander).toBeInTheDocument();
    });

    test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
        const { getByText } = renderWithRouter(<App />);
        const buttonNext = getByText('Próximo pokémon');
        fireEvent.click(buttonNext);

        const charmander = getByText(/charmander/i);
        expect(charmander).toBeInTheDocument();
    });

    test('Testa se é mostrado apenas um Pokémon por vez', () => {
        const { getByText, getByTestId } = renderWithRouter(<App />);
        const buttonNextPokemon = getByTestId('next-pokemon');

        fireEvent.click(buttonNextPokemon);
        const charmander = getByText(/Charmander/i);
        expect(charmander).toBeInTheDocument();

        fireEvent.click(buttonNextPokemon);
        const caterpie = getByText(/Caterpie/i);
        expect(caterpie).toBeInTheDocument();

        fireEvent.click(buttonNextPokemon);
        const ekans = getByText(/Ekans/i);
        expect(ekans).toBeInTheDocument();

        fireEvent.click(buttonNextPokemon);
        const alakazam = getByText(/Alakazam/i);
        expect(alakazam).toBeInTheDocument();

        fireEvent.click(buttonNextPokemon);
        const mew = getByText(/Mew/i);
        expect(mew).toBeInTheDocument();

        fireEvent.click(buttonNextPokemon);
        const rapidash = getByText(/Rapidash/i);
        expect(rapidash).toBeInTheDocument();

        fireEvent.click(buttonNextPokemon);
        const snorlax = getByText(/Snorlax/i);
        expect(snorlax).toBeInTheDocument();

        fireEvent.click(buttonNextPokemon);
        const dragonair = getByText(/Dragonair/i);
        expect(dragonair).toBeInTheDocument();

        fireEvent.click(buttonNextPokemon);
        const pikachu = getByText(/Pikachu/i);
        expect(pikachu).toBeInTheDocument();
    });

    test('Testa se a Pokédex tem os botões de filtro', () => {
        const { getAllByTestId } = renderWithRouter(<App />);
        const typeButtons = getAllByTestId('pokemon-type-button');
        const seven = 7;
        expect(typeButtons.length).toBe(seven);
    });

    test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
        const { getByText } = renderWithRouter(<App />);
        const buttonAll = getByText('All').innerHTML;
        expect(buttonAll).toBe('All');
    });

    test('Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
        const { getAllByTestId } = renderWithRouter(<App />);
        const typeButtons = getAllByTestId('pokemon-type-button');
        const seven = 7;
        expect(typeButtons.length).toBe(seven);
        expect(typeButtons[0]).toBeInTheDocument();
        expect(typeButtons[1]).toBeInTheDocument();
        expect(typeButtons[2]).toBeInTheDocument();
        expect(typeButtons[3]).toBeInTheDocument();
        expect(typeButtons[4]).toBeInTheDocument();
        expect(typeButtons[5]).toBeInTheDocument();
        expect(typeButtons[6]).toBeInTheDocument();
    });

    test('Testa se o botão de Próximo pokémon é desabilitado quando a lista filtrada de Pokémons tiver um só pokémon', () => {
        const { getAllByTestId, getByText, getByTestId } = renderWithRouter(<App />);
        const buttonEletric = getAllByTestId('pokemon-type-button')[0];
        fireEvent.click(buttonEletric);
        const pikachu = getByText(/Pikachu/i);
        expect(pikachu).toBeInTheDocument();
        const buttonNext = getByTestId('next-pokemon');
        fireEvent.click(buttonNext);
        expect(pikachu).toBeInTheDocument();
    });
});
