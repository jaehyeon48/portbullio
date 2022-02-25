import { CustomWrapper, render, screen } from '@api/testingLibrary';
import Welcome from '../Welcome';

describe('Welcome Page', () => {
	test('should have a welcome text', () => {
		render(
			<CustomWrapper>
				<Welcome />
			</CustomWrapper>
		);

		const welcomeText = screen.getByText(/회원가입을 축하합니다/);
		expect(welcomeText).toBeInTheDocument();
	});

	test('should have a welcome page hero image', () => {
		render(
			<CustomWrapper>
				<Welcome />
			</CustomWrapper>
		);

		const heroImage = screen.getByLabelText('Welcome page hero image');
		expect(heroImage).toBeInTheDocument();
	});

	test('should have a create new portfolio link button', () => {
		render(
			<CustomWrapper>
				<Welcome />
			</CustomWrapper>
		);

		const createNewPortfolioButton = screen.getByRole('link', { name: /새 포트폴리오 만들기/ });
		expect(createNewPortfolioButton).toBeInTheDocument();
	});
});
