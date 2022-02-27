import { CustomWrapper, render, screen } from '@api/testingLibrary';
import { Portfolio } from '@types';
import PortfolioList from '../Main/PortfolioList';

describe('Portfolio list layout', () => {
	test('Should have a loading indicator', () => {
		render(
			<CustomWrapper>
				<PortfolioList
					isLoading
					portfolioList={dummyPortfolioList}
					defaultPortfolioId={undefined}
				/>
			</CustomWrapper>
		);

		expect(screen.getByText(/로딩 중/)).toBeInTheDocument();
	});

	test('Should have an empty portfolio notice', () => {
		render(
			<CustomWrapper>
				<PortfolioList isLoading={false} portfolioList={[]} defaultPortfolioId={undefined} />
			</CustomWrapper>
		);

		expect(screen.getByText(/포트폴리오가 없습니다/)).toBeInTheDocument();
	});

	test('Should have a correct portfolio item layout', () => {
		render(
			<CustomWrapper>
				<PortfolioList
					isLoading={false}
					portfolioList={dummyPortfolioList}
					defaultPortfolioId={undefined}
				/>
			</CustomWrapper>
		);

		expect(screen.getByText(/포트폴리오 이름 포트폴리오 이름/)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /변경/ })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /이름 수정/ })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /삭제/ })).toBeInTheDocument();
	});

	test('Should indicate a default portfolio', () => {
		render(
			<CustomWrapper>
				<PortfolioList
					isLoading={false}
					portfolioList={dummyPortfolioList}
					defaultPortfolioId={1}
				/>
			</CustomWrapper>
		);

		expect(screen.getByRole('button', { name: /기본/ })).toBeInTheDocument();
	});
});

const dummyPortfolioList: Portfolio[] = [
	{
		id: 1,
		userId: 1,
		name: '포트폴리오 이름 포트폴리오 이름',
		privacy: 'public',
		createdAt: new Date()
	}
];
