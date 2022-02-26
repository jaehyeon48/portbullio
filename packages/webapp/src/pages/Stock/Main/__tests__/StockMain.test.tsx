import { render, screen } from '@api/testingLibrary';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import StockMain from '../StockMain';

describe('Stock Main Layout', () => {
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

	test('Should have a current price component', () => {
		render(
			<MemoryRouter initialEntries={['/stock/aapl']}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByLabelText('Current price')).toBeInTheDocument();
	});

	test('Should have a price change component', () => {
		render(
			<MemoryRouter initialEntries={['/stock/aapl']}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByLabelText('Price change')).toBeInTheDocument();
	});

	test('Should have four stock menu links', () => {
		render(
			<MemoryRouter initialEntries={['/stock/aapl']}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByRole('link', { name: '개요' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: '기업 정보' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: '재무 정보' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: '뉴스' })).toBeInTheDocument();
	});
});
