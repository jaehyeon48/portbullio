import { CustomWrapper, render, screen } from '@api/testingLibrary';
import Auth from '../Auth';

describe('OAuth page', () => {
	test('should have a logo image', () => {
		render(
			<CustomWrapper>
				<Auth />
			</CustomWrapper>
		);

		const logoImage = screen.getByAltText(/main logo/);
		expect(logoImage).toBeInTheDocument();
	});

	test('should have a title saying "환영합니다"', () => {
		render(
			<CustomWrapper>
				<Auth />
			</CustomWrapper>
		);

		const titleHeader = screen.getByText(/환영합니다/);
		expect(titleHeader).toBeInTheDocument();
	});

	test('should have three oauth buttons', () => {
		render(
			<CustomWrapper>
				<Auth />
			</CustomWrapper>
		);

		const googleOAuthButton = screen.getByLabelText('Google auth');
		const naverOAuthButton = screen.getByLabelText('Naver auth');
		const kakaoOAuthButton = screen.getByLabelText('Kakao auth');

		expect(googleOAuthButton).toBeInTheDocument();
		expect(naverOAuthButton).toBeInTheDocument();
		expect(kakaoOAuthButton).toBeInTheDocument();
	});
});
