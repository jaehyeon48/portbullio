import { useTheme } from 'styled-components';
import mainLogoLight from '@assets/images/navbar_main_logo_light.webp';
import mainLogoDark from '@assets/images/navbar_main_logo_dark.webp';
import * as Icon from '@components/Icon';
import * as Nav from './style';

const navbarLogoWidth = 76;
const navbarLogoHeight = 50;

export default function Navbar() {
	const { currentTheme } = useTheme();
	const logoSrc = currentTheme === 'light' ? mainLogoLight : mainLogoDark;

	return (
		<Nav.Container>
			<Nav.Top alignItems="center" justifyContent="center">
				<img
					src={logoSrc}
					alt={`main logo ${currentTheme}`}
					width={navbarLogoWidth}
					height={navbarLogoHeight}
				/>
			</Nav.Top>
			<Nav.Middle flexDirection="column" alignItems="center" justifyContent="space-evenly">
				<Icon.Home />
				<Icon.Dashboard />
				<Icon.List />
				<Icon.Coins />
				<Icon.CoinsOnHand />
				<Icon.Settings />
			</Nav.Middle>
			<Nav.Bottom alignItems="center" justifyContent="center">
				<Icon.SignIn />
			</Nav.Bottom>
		</Nav.Container>
	);
}
