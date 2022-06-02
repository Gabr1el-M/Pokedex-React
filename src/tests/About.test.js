import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import About from '../components/About';

const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
        ...render(<Router history={history}>{component}</Router>), history,
    });
};

describe('Testa o arquivo About', () => {
    test('Testa se a página contém as informações sobre a Pokédex', () => {
        const { getByText } = renderWithRouter(<About />);
        const paragraph = getByText(/This application simulates a Pokédex/i);
        expect(paragraph).toBeInTheDocument();
    });

    test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
        const { container } = renderWithRouter(<About />);
        const heading = container.querySelector('h2').innerHTML;
        expect(heading).toBe('About Pokédex');
    });

    test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
        const { container } = renderWithRouter(<About />);
        const tagsP = container.querySelectorAll('p');
        const numbersP = 2;
        expect(tagsP.length).toBe(numbersP);

    });

    test('Testa se a pagina contem a seguintem imagem de uma pokedex', () => {
        const imageURL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
        const { container } = renderWithRouter(<About />);
        const image = container.querySelector('img').src;
        expect(imageURL).toBe(image);
    });
});

