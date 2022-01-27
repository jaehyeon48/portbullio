import { useTheme } from 'styled-components';
import mainLogoLight from '@assets/images/navbar_main_logo_light.webp';
import mainLogoDark from '@assets/images/navbar_main_logo_dark.webp';
import * as Icon from '@components/Icon';
import * as Nav from './style';
import NavbarIconWrapper from './NavbarIconWrapper';

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
				<NavbarIconWrapper>
					<Icon.Dashboard />
					<p>대시보드</p>
				</NavbarIconWrapper>
				<NavbarIconWrapper>
					<Icon.List />
					<p>내 포트폴리오</p>
				</NavbarIconWrapper>
				<NavbarIconWrapper>
					<Icon.Coins />
					<p>현금</p>
				</NavbarIconWrapper>
				<NavbarIconWrapper>
					<Icon.CoinsOnHand />
					<p>배당</p>
				</NavbarIconWrapper>
				<NavbarIconWrapper>
					<Icon.Settings />
					<p>설정</p>
				</NavbarIconWrapper>
			</Nav.Middle>
			<Nav.Bottom alignItems="center" justifyContent="center">
				<NavbarIconWrapper>
					<Icon.SignIn />
					<p>로그인</p>
				</NavbarIconWrapper>
			</Nav.Bottom>
		</Nav.Container>
	);
}
