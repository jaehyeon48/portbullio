import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import StockMain from '../Main/StockMain';

const queryClient = new QueryClient();

test('Should render AAPL stock page', () => {
	render(
		<MemoryRouter initialEntries={['/stock/aapl']}>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</QueryClientProvider>
		</MemoryRouter>
	);

	expect(screen.getByLabelText('Company name')).toBeInTheDocument();
	expect(screen.getByLabelText('Ticker name')).toHaveTextContent('AAPL');
	expect(screen.getByLabelText('Exchange name')).toBeInTheDocument();
});

test('Should render TSLA stock page', () => {
	render(
		<MemoryRouter initialEntries={['/stock/tsla']}>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</QueryClientProvider>
		</MemoryRouter>
	);

	expect(screen.getByLabelText('Company name')).toBeInTheDocument();
	expect(screen.getByLabelText('Ticker name')).toHaveTextContent('TSLA');
	expect(screen.getByLabelText('Exchange name')).toBeInTheDocument();
});

test('Should have a current price component', () => {
	render(
		<MemoryRouter initialEntries={['/stock/aapl']}>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</QueryClientProvider>
		</MemoryRouter>
	);

	expect(screen.getByLabelText('Currency symbol')).toBeInTheDocument();
	expect(screen.getByLabelText('Current price')).toBeInTheDocument();
});

test('Should have a price change component', () => {
	render(
		<MemoryRouter initialEntries={['/stock/aapl']}>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</QueryClientProvider>
		</MemoryRouter>
	);

	expect(screen.getByLabelText('Price change')).toBeInTheDocument();
});

test('Should have four stock menu links', () => {
	render(
		<MemoryRouter initialEntries={['/stock/aapl']}>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="stock/:ticker" element={<StockMain />} />
				</Routes>
			</QueryClientProvider>
		</MemoryRouter>
	);

	expect(screen.getByRole('link', { name: '개요' })).toBeInTheDocument();
	expect(screen.getByRole('link', { name: '기업 정보' })).toBeInTheDocument();
	expect(screen.getByRole('link', { name: '재무 정보' })).toBeInTheDocument();
	expect(screen.getByRole('link', { name: '뉴스' })).toBeInTheDocument();
});
