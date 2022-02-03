import { render, screen, CustomWrapper } from '@api/testingLibrary';
import { lightTheme, darkTheme } from '@src/styles/Theme';
import Welcome from '../Welcome';

test('Welcome page test on light theme', () => {
	render(
		<CustomWrapper theme={lightTheme}>
			<Welcome />
		</CustomWrapper>
	);

	const welcomeText = screen.getByText(/회원가입을 축하합니다/);
	const createNewPortfolioLink = screen.getByRole('link');
	const heroImage = screen.getByLabelText('Welcome page hero image light theme');
	expect(welcomeText).toHaveStyle('color: #12B886');
	expect(createNewPortfolioLink).toBeInTheDocument();
	expect(heroImage).toBeInTheDocument();
});

test('Welcome page test on dark theme', () => {
	render(
		<CustomWrapper theme={darkTheme}>
			<Welcome />
		</CustomWrapper>
	);

	const heroImage = screen.getByLabelText('Welcome page hero image dark theme');
	expect(heroImage).toBeInTheDocument();
});
