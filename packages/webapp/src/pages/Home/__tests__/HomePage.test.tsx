import { CustomWrapper, screen, render } from '@api/testingLibrary';
import Home from '../Home';

describe('Home page', () => {
	test('Should have a main hero image', () => {
		render(
			<CustomWrapper>
				<Home />
			</CustomWrapper>
		);

		expect(screen.getByTitle('Main page hero image')).toBeInTheDocument();
	});

	test('Should have a main page title', () => {
		render(
			<CustomWrapper>
				<Home />
			</CustomWrapper>
		);

		expect(screen.getByText(/미국 주식 포트폴리오 관리,/)).toBeInTheDocument();
	});

	test('Should have a "시작하기" button', () => {
		render(
			<CustomWrapper>
				<Home />
			</CustomWrapper>
		);

		expect(screen.getByRole('button', { name: /시작하기/ })).toBeInTheDocument();
	});

	test('Should have a "내 포트폴리오" button', () => {
		render(
			<CustomWrapper authValue>
				<Home />
			</CustomWrapper>
		);

		expect(screen.getByRole('link', { name: /내 포트폴리오/ })).toBeInTheDocument();
	});

	test('Should have 3 major US stock index info components', () => {
		render(
			<CustomWrapper authValue>
				<Home />
			</CustomWrapper>
		);

		expect(screen.getByText(/다우 존스/)).toBeInTheDocument();
		expect(screen.getByText(/S&P 500/)).toBeInTheDocument();
		expect(screen.getByText(/나스닥 종합/)).toBeInTheDocument();
	});

	test('Should have 3 daily top5 stocks link', () => {
		render(
			<CustomWrapper authValue>
				<Home />
			</CustomWrapper>
		);

		expect(screen.getByRole('link', { name: /거래량/ })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /상승률/ })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /하락률/ })).toBeInTheDocument();
	});
});
