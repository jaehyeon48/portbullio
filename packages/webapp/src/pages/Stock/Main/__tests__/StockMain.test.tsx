import { render, screen } from '@api/testingLibrary';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import StockMain from '../StockMain';

test('Should render AAPL stock page', () => {
	render(
		<MemoryRouter initialEntries={['/stock/aapl']}>
			<Routes>
				<Route path="stock/:ticker" element={<StockMain />} />
			</Routes>
		</MemoryRouter>
	);

	expect(screen.getByLabelText('Ticker')).toHaveTextContent('AAPL');
});

test('Should render MSFT stock page', () => {
	render(
		<MemoryRouter initialEntries={['/stock/msft']}>
			<Routes>
				<Route path="stock/:ticker" element={<StockMain />} />
			</Routes>
		</MemoryRouter>
	);

	expect(screen.getByLabelText('Ticker')).toHaveTextContent('MSFT');
});
