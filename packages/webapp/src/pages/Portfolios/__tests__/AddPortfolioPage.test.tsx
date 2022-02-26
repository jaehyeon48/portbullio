import { CustomWrapper, render, screen } from '@api/testingLibrary';
import AddPortfolioPage from '../AddAndEditPage/AddPortfolio';

describe('Add portfolio page layout', () => {
	test('Should have a "포트폴리오 추가" header', () => {
		render(
			<CustomWrapper>
				<AddPortfolioPage closeModal={jest.fn()} />
			</CustomWrapper>
		);

		expect(screen.getByText(/포트폴리오 추가/)).toBeInTheDocument();
	});

	test('Should have a new portfolio name input', () => {
		render(
			<CustomWrapper>
				<AddPortfolioPage closeModal={jest.fn()} />
			</CustomWrapper>
		);

		expect(screen.getByPlaceholderText('새 포트폴리오 이름')).toBeInTheDocument();
	});

	test('Should have select privacy radio inputs', () => {
		render(
			<CustomWrapper>
				<AddPortfolioPage closeModal={jest.fn()} />
			</CustomWrapper>
		);

		expect(screen.getByLabelText('공개')).toBeInTheDocument();
		expect(screen.getByLabelText('비공개')).toBeInTheDocument();
	});

	test('Should have a submit button', () => {
		render(
			<CustomWrapper>
				<AddPortfolioPage closeModal={jest.fn()} />
			</CustomWrapper>
		);

		expect(screen.getByRole('button', { name: '추가하기' })).toBeInTheDocument();
	});
});
