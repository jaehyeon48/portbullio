import { render, screen } from '@api/testingLibrary';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@styles/Theme';
import StockMain from '../StockMain';

test('Should render AAPL stock page', () => {
	render(
		<MemoryRouter initialEntries={['/stock/aapl']}>
			<ThemeProvider theme={lightTheme}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</ThemeProvider>
		</MemoryRouter>
	);

	const ticker = screen.getByLabelText('Ticker');
	expect(ticker).toHaveTextContent('AAPL');
});

test('Should render MSFT stock page', () => {
	render(
		<MemoryRouter initialEntries={['/stock/msft']}>
			<ThemeProvider theme={lightTheme}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</ThemeProvider>
		</MemoryRouter>
	);

	const ticker = screen.getByLabelText('Ticker');
	expect(ticker).toHaveTextContent('MSFT');
});
