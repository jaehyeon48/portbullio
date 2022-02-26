import { render, screen } from '@api/testingLibrary';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import StockMain from '../Main/StockMain';

describe('Stock Main Layout', () => {
	test('Should render AAPL stock page', () => {
		render(
			<MemoryRouter initialEntries={['/stock/aapl']}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByTestId('company-name')).toBeInTheDocument();
		expect(screen.getByTestId('ticker')).toHaveTextContent('AAPL');
	});

	test('Should render MSFT stock page', () => {
		render(
			<MemoryRouter initialEntries={['/stock/msft']}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByTestId('company-name')).toBeInTheDocument();
		expect(screen.getByTestId('ticker')).toHaveTextContent('MSFT');
	});

	test('Should have a current price component', () => {
		render(
			<MemoryRouter initialEntries={['/stock/aapl']}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByTestId('current-price')).toBeInTheDocument();
		expect(screen.getByTestId('currency-symbol')).toBeInTheDocument();
	});

	test('Should have a price change component', () => {
		render(
			<MemoryRouter initialEntries={['/stock/aapl']}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</MemoryRouter>
		);

		expect(screen.getByTestId('price-change')).toBeInTheDocument();
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
