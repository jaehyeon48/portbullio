import { render, screen } from '@api/testingLibrary';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '@styles/Theme';
import StockMain from '../StockMain';

test('Stock main page test on light theme', () => {
	render(
		<MemoryRouter initialEntries={['/stock/aapl']}>
			<ThemeProvider theme={lightTheme}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</ThemeProvider>
		</MemoryRouter>
	);

	const companyName = screen.getByLabelText('Company name');
	const ticker = screen.getByLabelText('Ticker');
	const currencySymbol = screen.getByLabelText('Currency symbol');
	const priceChangeContainer = screen.getByLabelText('Price change');
	const linksContainer = screen.getByLabelText('Stock page links');
	const overviewLink = screen.getByRole('link', { name: '개요' });

	expect(companyName).toHaveStyle('color: #000');
	expect(priceChangeContainer).toBeInTheDocument();
	expect(ticker).toHaveTextContent('AAPL');
	expect(currencySymbol).toHaveStyle('color: #9CA6B0');
	expect(linksContainer).toHaveStyle('border-bottom: 1px solid #DEE1E5');
	expect(overviewLink).toHaveStyle('color: #868E96');
});

test('Stock main page test on dark theme', () => {
	render(
		<MemoryRouter initialEntries={['/stock/aapl']}>
			<ThemeProvider theme={darkTheme}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</ThemeProvider>
		</MemoryRouter>
	);

	const companyName = screen.getByLabelText('Company name');
	const ticker = screen.getByLabelText('Ticker');
	const currencySymbol = screen.getByLabelText('Currency symbol');
	const linksContainer = screen.getByLabelText('Stock page links');
	const overviewLink = screen.getByRole('link', { name: '개요' });

	expect(companyName).toHaveStyle('color: #FFF');
	expect(ticker).toHaveTextContent('AAPL');
	expect(currencySymbol).toHaveStyle('color: #A6B6C6');
	expect(linksContainer).toHaveStyle('border-bottom: 1px solid #4F5278');
	expect(overviewLink).toHaveStyle('color: #98A7B6');
});
