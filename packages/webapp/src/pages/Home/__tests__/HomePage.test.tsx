import { CustomWrapper, screen, render } from '@api/testingLibrary';
import Home from '../Home';

describe('Home page', () => {
	test('should have a main hero image', () => {
		render(
			<CustomWrapper>
				<Home />
			</CustomWrapper>
		);

		const heroImage = screen.getByLabelText('Main page hero image');
		expect(heroImage).toBeInTheDocument();
	});

	test('should have a main page title', () => {
		render(
			<CustomWrapper>
				<Home />
			</CustomWrapper>
		);

		const title = screen.getByLabelText('Main page title');
		expect(title).toBeInTheDocument();
	});

	test('should have a "시작하기" button', () => {
		render(
			<CustomWrapper>
				<Home />
			</CustomWrapper>
		);

		const startButton = screen.getByRole('button', { name: /시작하기/ });
		expect(startButton).toBeInTheDocument();
	});

	test('should have a "내 포트폴리오" button', () => {
		render(
			<CustomWrapper authValue>
				<Home />
			</CustomWrapper>
		);

		const myPortfolioButton = screen.getByRole('link', { name: /내 포트폴리오/ });
		expect(myPortfolioButton).toBeInTheDocument();
	});

	test('should have 3 major US stock index info components', () => {
		render(
			<CustomWrapper authValue>
				<Home />
			</CustomWrapper>
		);

		const dowJonesInfo = screen.getByLabelText('DJI index info');
		const snp500Info = screen.getByLabelText('SPX index info');
		const nasdaqInfo = screen.getByLabelText('IXIC index info');

		expect(dowJonesInfo).toBeInTheDocument();
		expect(snp500Info).toBeInTheDocument();
		expect(nasdaqInfo).toBeInTheDocument();
	});

	test('should have 3 daily top5 stocks link', () => {
		render(
			<CustomWrapper authValue>
				<Home />
			</CustomWrapper>
		);

		const dailyVolumeTop5Link = screen.getByRole('link', { name: /거래량/ });
		const dailyGainerTop5Link = screen.getByRole('link', { name: /상승률/ });
		const dailyLoserTop5Link = screen.getByRole('link', { name: /하락률/ });

		expect(dailyVolumeTop5Link).toBeInTheDocument();
		expect(dailyGainerTop5Link).toBeInTheDocument();
		expect(dailyLoserTop5Link).toBeInTheDocument();
	});
});
