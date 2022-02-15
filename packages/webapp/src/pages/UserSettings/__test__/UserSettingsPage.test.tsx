import { render, screen, CustomWrapper } from '@api/testingLibrary';
import { lightTheme } from '@styles/Theme';
import UserSettings from '../UserSettings';

test('User settings page renders correctly', () => {
	render(
		<CustomWrapper theme={lightTheme}>
			<UserSettings />
		</CustomWrapper>
	);

	const userProfileImageContainer = screen.getByLabelText('User profile image');
	const userBioInput = screen.getByPlaceholderText('내 설명');
	const userLocationInput = screen.getByPlaceholderText('내 위치');
	const submitButton = screen.getByRole('button', { name: '수정' });

	expect(userProfileImageContainer).toBeInTheDocument();
	expect(userBioInput).toBeInTheDocument();
	expect(userLocationInput).toBeInTheDocument();
	expect(submitButton).toBeInTheDocument();
});
