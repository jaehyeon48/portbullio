import { render, screen, CustomWrapper } from '@api/testingLibrary';
import { lightTheme } from '@src/styles/Theme';
import Welcome from '../Welcome';

test('Welcome page test', () => {
	render(
		<CustomWrapper theme={lightTheme}>
			<Welcome />
		</CustomWrapper>
	);

	const welcomeText = screen.getByText(/회원가입을 축하합니다/);
	const createNewPortfolioLink = screen.getByRole('link');
	const heroImage = screen.getByLabelText('Welcome page hero image');
	expect(welcomeText).toHaveStyle('color: #12B886');
	expect(createNewPortfolioLink).toBeInTheDocument();
	expect(heroImage).toBeInTheDocument();
});
