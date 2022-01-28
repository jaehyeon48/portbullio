import { render, screen, CustomWrapper } from '@api/testingLibrary';
import { lightTheme, darkTheme } from '@src/styles/Theme';
import Auth from '../Auth';

test('Auth page test on light theme', () => {
	render(
		<CustomWrapper theme={lightTheme}>
			<Auth />
		</CustomWrapper>
	);

	const welcomeText = screen.getByText(/환영합니다!/);
	const mainLogoImg = screen.getByAltText('main logo light');
	const googleAuthButton = screen.getByLabelText('Google auth');
	const naverAuthButton = screen.getByLabelText('Naver auth');
	const kakaoAuthButton = screen.getByLabelText('Kakao auth');

	expect(welcomeText).toHaveStyle('color: #12B886');
	expect(mainLogoImg).toBeInTheDocument();
	expect(googleAuthButton).toBeInTheDocument();
	expect(naverAuthButton).toBeInTheDocument();
	expect(kakaoAuthButton).toBeInTheDocument();
});

test('Auth page test', () => {
	render(
		<CustomWrapper theme={darkTheme}>
			<Auth />
		</CustomWrapper>
	);

	const mainLogoImg = screen.getByAltText('main logo dark');
	expect(mainLogoImg).toBeInTheDocument();
});
