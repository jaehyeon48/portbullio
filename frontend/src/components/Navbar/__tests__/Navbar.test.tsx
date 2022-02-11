import { render, screen, CustomWrapper } from '@api/testingLibrary';
import { lightTheme, darkTheme } from '@styles/Theme';
import Navbar from '../index';

const numOfNavbarIcons = 5;

test('Navbar layout test on light theme', () => {
	render(
		<CustomWrapper theme={lightTheme}>
			<Navbar />
		</CustomWrapper>
	);

	const navbarContainer = screen.getByRole('complementary');
	const mainLogoImg = screen.getByAltText(`main logo light`);
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
	const mainLogoImg = screen.getByAltText('main logo dark');
	const navbarIcons = screen.getAllByLabelText('icon');

	expect(navbarContainer).toHaveStyle(`background-color: ${darkTheme.navbar.bgColor}`);
	expect(mainLogoImg).toBeInTheDocument();
	expect(navbarIcons).toHaveLength(numOfNavbarIcons);
});
