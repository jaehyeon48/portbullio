import { render, screen } from '@testing-library/react';
import { CustomWrapper } from '@lib/testingLibrary/react';
import AddPortfolioPage from '../ModalPage/AddPortfolio';

describe('Add portfolio page layout', () => {
	test('Should have a "포트폴리오 추가" header', () => {
		render(
			<CustomWrapper>
				<AddPortfolioPage />
			</CustomWrapper>
		);

		expect(screen.getByText(/포트폴리오 추가/)).toBeInTheDocument();
	});

	test('Should have a new portfolio name input', () => {
		render(
			<CustomWrapper>
				<AddPortfolioPage />
			</CustomWrapper>
		);

		expect(screen.getByPlaceholderText('새 포트폴리오 이름')).toBeInTheDocument();
	});

	test('Should have a max portfolio name length notice', () => {
		render(
			<CustomWrapper>
				<AddPortfolioPage />
			</CustomWrapper>
		);

		expect(screen.getByText('*이름은 최대 20자까지 가능합니다.')).toBeInTheDocument();
	});

	test('Should have select privacy radio inputs', () => {
		render(
			<CustomWrapper>
				<AddPortfolioPage />
			</CustomWrapper>
		);

		expect(screen.getByLabelText('공개')).toBeInTheDocument();
		expect(screen.getByLabelText('비공개')).toBeInTheDocument();
	});

	test('Should have a submit button', () => {
		render(
			<CustomWrapper>
				<AddPortfolioPage />
			</CustomWrapper>
		);

		expect(screen.getByRole('button', { name: '추가하기' })).toBeInTheDocument();
	});
});
