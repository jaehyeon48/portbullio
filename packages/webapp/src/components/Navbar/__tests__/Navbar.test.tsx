import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomWrapper } from '@lib/testingLibrary/react';
import Navbar from '../index';

test('Should have a navbar main logo', async () => {
	render(
		<CustomWrapper>
			<Navbar />
		</CustomWrapper>
	);

	expect(await screen.findByAltText('Navbar main logo')).toBeInTheDocument();
});

test('Should not have navbar icons on unauthenticated state', () => {
	render(
		<CustomWrapper>
			<Navbar />
		</CustomWrapper>
	);

	expect(screen.queryByRole('link', { name: /대시보드/ })).not.toBeInTheDocument();
	expect(screen.queryByRole('link', { name: /내 종목/ })).not.toBeInTheDocument();
	expect(screen.queryByRole('link', { name: /내 포트폴리오/ })).not.toBeInTheDocument();
	expect(screen.queryByRole('link', { name: /현금/ })).not.toBeInTheDocument();
	expect(screen.getByRole('button', { name: /로그인/ })).toBeInTheDocument();
});

test('Should have navbar icons on authenticated state', async () => {
	render(
		<CustomWrapper authValue>
			<Navbar />
		</CustomWrapper>
	);

	expect(await screen.findByRole('link', { name: /대시보드/ })).toBeInTheDocument();
	expect(await screen.findByRole('link', { name: /내 종목/ })).toBeInTheDocument();
	expect(await screen.findByRole('link', { name: /내 포트폴리오/ })).toBeInTheDocument();
	expect(await screen.findByRole('link', { name: /현금/ })).toBeInTheDocument();
});

test('Should render user profile button on authenticated state', async () => {
	render(
		<CustomWrapper authValue>
			<Navbar />
		</CustomWrapper>
	);

	expect(await screen.findByLabelText('User profile button')).toBeInTheDocument();
});

test('Should render profile dropdown', async () => {
	render(
		<CustomWrapper authValue>
			<Navbar />
		</CustomWrapper>
	);

	userEvent.click(await screen.findByLabelText('User profile button'));
	expect(await screen.findByText('프로필 설정')).toBeInTheDocument();
	expect(await screen.findByLabelText('Logout')).toBeInTheDocument();
});

test('Open and close mobile navbar dropdown by clicking burger button', async () => {
	render(
		<CustomWrapper authValue>
			<Navbar />
		</CustomWrapper>
	);

	expect(document.body).not.toHaveClass('navbar-dropdown-opened');

	userEvent.click(await screen.findByLabelText('Toggle navbar dropdown'));
	expect(document.body).toHaveClass('navbar-dropdown-opened');

	userEvent.click(await screen.findByLabelText('Toggle navbar dropdown'));
	expect(document.body).not.toHaveClass('navbar-dropdown-opened');
});
