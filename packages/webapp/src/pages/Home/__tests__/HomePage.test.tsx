import { CustomWrapper, screen, render } from '@api/testingLibrary';
import Home from '../Home';

describe('Home page', () => {
	test('should have a main hero image', () => {
		render(
			<CustomWrapper>
				<Home />
			</CustomWrapper>
		);

		expect(screen.getByLabelText('Main page hero image')).toBeInTheDocument();
	});

	test('should have a main page title', () => {
		render(
			<CustomWrapper>
				<Home />
			</CustomWrapper>
		);

		expect(screen.getByLabelText('Main page title')).toBeInTheDocument();
	});

	test('should have a "시작하기" button', () => {
		render(
			<CustomWrapper>
				<Home />
			</CustomWrapper>
		);

		expect(screen.getByRole('button', { name: /시작하기/ })).toBeInTheDocument();
	});

	test('should have a "내 포트폴리오" button', () => {
		render(
			<CustomWrapper authValue>
				<Home />
			</CustomWrapper>
		);

		expect(screen.getByRole('link', { name: /내 포트폴리오/ })).toBeInTheDocument();
	});

	test('should have 3 major US stock index info components', () => {
		render(
			<CustomWrapper authValue>
				<Home />
			</CustomWrapper>
		);

		expect(screen.getByLabelText('DJI index info')).toBeInTheDocument();
		expect(screen.getByLabelText('SPX index info')).toBeInTheDocument();
		expect(screen.getByLabelText('IXIC index info')).toBeInTheDocument();
	});

	test('should have 3 daily top5 stocks link', () => {
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
