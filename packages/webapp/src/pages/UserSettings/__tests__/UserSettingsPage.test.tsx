import { CustomWrapper, screen, render, userEvent } from '@api/testingLibrary';
import UserSettings from '../UserSettings';

describe('User settings page', () => {
	test('should have a user profile image component', () => {
		render(
			<CustomWrapper>
				<UserSettings />
			</CustomWrapper>
		);

		expect(screen.getByLabelText('User profile image')).toBeInTheDocument();
	});

	test('should have a delete confirm message after clicking delete avatar button', () => {
		render(
			<CustomWrapper>
				<UserSettings />
			</CustomWrapper>
		);

		userEvent.click(screen.getByRole('button', { name: /이미지 삭제/ }));
		expect(screen.getByText('정말 이미지를 삭제하시겠습니까?')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '삭제' })).toBeInTheDocument();
	});

	test('should have a my bio edit input', () => {
		render(
			<CustomWrapper>
				<UserSettings />
			</CustomWrapper>
		);

		expect(screen.getByPlaceholderText('내 설명')).toBeInTheDocument();
	});

	test('should have a my location edit input', () => {
		render(
			<CustomWrapper>
				<UserSettings />
			</CustomWrapper>
		);

		expect(screen.getByPlaceholderText('내 위치')).toBeInTheDocument();
	});

	test('should have a edit button', () => {
		render(
			<CustomWrapper>
				<UserSettings />
			</CustomWrapper>
		);

		expect(screen.getByRole('button', { name: '수정' })).toBeInTheDocument();
	});
});
