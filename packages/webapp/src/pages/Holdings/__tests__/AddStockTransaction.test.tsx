import { render, screen } from '@testing-library/react';
import { CustomWrapper } from '@lib/testingLibrary/react';
import AddStockTransactionPage from '../ModalPage/AddNewStockTransaction';

describe('Add stock transaction page layout', () => {
	test('Should have a "거래내역 추가" header', () => {
		render(
			<CustomWrapper>
				<AddStockTransactionPage portfolioId={-1} />
			</CustomWrapper>
		);

		expect(screen.getByText(/거래내역 추가/)).toBeInTheDocument();
	});

	test('Should have a search stock input', () => {
		render(
			<CustomWrapper>
				<AddStockTransactionPage portfolioId={-1} />
			</CustomWrapper>
		);

		expect(screen.getByPlaceholderText('종목 검색...')).toBeInTheDocument();
	});

	test('Should have select transaction type radio inputs', () => {
		render(
			<CustomWrapper>
				<AddStockTransactionPage portfolioId={-1} />
			</CustomWrapper>
		);

		expect(screen.getByLabelText('매수')).toBeInTheDocument();
		expect(screen.getByLabelText('매도')).toBeInTheDocument();
	});

	test('Should have ticker, price, and quantity inputs', () => {
		render(
			<CustomWrapper>
				<AddStockTransactionPage portfolioId={-1} />
			</CustomWrapper>
		);

		expect(screen.getByLabelText('종목 티커')).toBeInTheDocument();
		expect(screen.getByLabelText('가격')).toBeInTheDocument();
		expect(screen.getByLabelText('수량')).toBeInTheDocument();
	});

	test('Should have a submit button', () => {
		render(
			<CustomWrapper>
				<AddStockTransactionPage portfolioId={-1} />
			</CustomWrapper>
		);

		expect(screen.getByRole('button', { name: '추가하기' })).toBeInTheDocument();
	});
});
