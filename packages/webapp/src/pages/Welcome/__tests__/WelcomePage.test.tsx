import { CustomWrapper, render, screen } from '@api/testingLibrary';
import Welcome from '../Welcome';

describe('Welcome Page', () => {
	test('should have a welcome text', () => {
		render(
			<CustomWrapper>
				<Welcome />
			</CustomWrapper>
		);

		expect(screen.getByText(/회원가입을 축하합니다/)).toBeInTheDocument();
	});

	test('should have a welcome page hero image', () => {
		render(
			<CustomWrapper>
				<Welcome />
			</CustomWrapper>
		);

		expect(screen.getByLabelText('Welcome page hero image')).toBeInTheDocument();
	});

	test('should have a create new portfolio link button', () => {
		render(
			<CustomWrapper>
				<Welcome />
			</CustomWrapper>
		);

		expect(screen.getByRole('link', { name: /새 포트폴리오 만들기/ })).toBeInTheDocument();
	});
});
