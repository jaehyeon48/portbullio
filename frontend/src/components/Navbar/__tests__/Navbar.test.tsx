import { render, screen, CustomWrapper, userEvent } from '@api/testingLibrary';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import { lightTheme, darkTheme } from '@src/styles/Theme';
import { AuthContextProvider } from '@hooks/Auth';
import Navbar from '../index';

const numOfNavbarIcons = 6;

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

test('Navbar w/ react router', () => {
	render(
		<MemoryRouter>
			<ThemeProvider theme={lightTheme}>
				<AuthContextProvider>
					<Navbar />
				</AuthContextProvider>
			</ThemeProvider>
		</MemoryRouter>
	);

	const navbarLinks = screen.getAllByRole('link');
	const dashboardLink = navbarLinks[1];
	const portfolioLink = navbarLinks[2];

	expect(dashboardLink.firstChild).toHaveStyle('fill:#ADB5BD');
	userEvent.click(dashboardLink);
	expect(dashboardLink.firstChild).toHaveStyle('fill:#12B886');

	expect(portfolioLink.firstChild).toHaveStyle('fill:#ADB5BD');
	userEvent.click(portfolioLink);
	expect(dashboardLink.firstChild).toHaveStyle('fill:#ADB5BD');
	expect(portfolioLink.firstChild).toHaveStyle('fill:#12B886');
});
