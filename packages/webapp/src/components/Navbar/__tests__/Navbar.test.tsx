import { render, screen, CustomWrapper, userEvent } from '@api/testingLibrary';
import Navbar from '../index';

describe('Navbar layout', () => {
	test('Should have a navbar main logo', () => {
		render(
			<CustomWrapper>
				<Navbar />
			</CustomWrapper>
		);

		expect(screen.getByAltText('Navbar main logo')).toBeInTheDocument();
	});

	test('Should have navbar icons', () => {
		render(
			<CustomWrapper>
				<Navbar />
			</CustomWrapper>
		);

		expect(screen.getByRole('link', { name: /대시보드/ })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /내 포트폴리오/ })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /현금/ })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /배당/ })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /로그인/ })).toBeInTheDocument();
	});

	test('Should render user profile button on authenticated state', () => {
		render(
			<CustomWrapper authValue>
				<Navbar />
			</CustomWrapper>
		);

		expect(screen.getByLabelText('User profile button')).toBeInTheDocument();
	});

	test('Should render profile dropdown', () => {
		render(
			<CustomWrapper authValue>
				<Navbar />
			</CustomWrapper>
		);

		userEvent.click(screen.getByLabelText('User profile button'));
		expect(screen.getByLabelText('Set profile')).toBeInTheDocument();
		expect(screen.getByLabelText('Logout')).toBeInTheDocument();
	});
});
