import { render, screen, CustomWrapper } from '@api/testingLibrary';
import { lightTheme, darkTheme } from '@src/styles/Theme';
import Navbar from '../index';

const numOfNavbarIcons = 7;

test('Navbar layout test on light theme', () => {
	render(
		<CustomWrapper theme={lightTheme}>
			<Navbar />
		</CustomWrapper>
	);

	const navbarContainer = screen.getByRole('complementary');
	const mainLogoImg = screen.getByAltText('main logo');
	const navbarIcons = screen.getAllByLabelText('icon');

	expect(navbarContainer).toHaveStyle(`background-color: ${lightTheme.navbar.bgColor}`);
	expect(mainLogoImg).toBeInTheDocument();
	expect(navbarIcons).toHaveLength(numOfNavbarIcons);
});

test('Navbar layout test on dark theme', () => {
	render(
		<CustomWrapper theme={darkTheme}>
			<Navbar />
		</CustomWrapper>
	);

	const navbarContainer = screen.getByRole('complementary');
	const mainLogoImg = screen.getByAltText('main logo');
	const navbarIcons = screen.getAllByLabelText('icon');

	expect(navbarContainer).toHaveStyle(`background-color: ${darkTheme.navbar.bgColor}`);
	expect(mainLogoImg).toBeInTheDocument();
	expect(navbarIcons).toHaveLength(numOfNavbarIcons);
});
