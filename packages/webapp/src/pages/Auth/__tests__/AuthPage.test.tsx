import { CustomWrapper, render, screen } from '@lib/testingLibrary/react';
import Auth from '../index';

describe('OAuth page', () => {
	test('Should have a logo image', () => {
		render(
			<CustomWrapper>
				<Auth />
			</CustomWrapper>
		);

		const logoImage = screen.getByAltText(/main logo/);
		expect(logoImage).toBeInTheDocument();
	});

	test('Should have a title saying "환영합니다"', () => {
		render(
			<CustomWrapper>
				<Auth />
			</CustomWrapper>
		);

		const titleHeader = screen.getByText(/환영합니다/);
		expect(titleHeader).toBeInTheDocument();
	});

	test('Should have three oauth buttons', () => {
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
