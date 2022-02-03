import { SyntheticEvent } from 'react';
import { useTheme } from 'styled-components';
import mainLogoLight from '@assets/images/navbar_main_logo_light.webp';
import mainLogoDark from '@assets/images/navbar_main_logo_dark.webp';
import * as Icon from '@components/Icon';
import Button from '@components/Button';
import AuthPage from '@pages/Auth';
import { useModal } from '@hooks/Modal';
import { navbarIconMixin } from '@styles/mixins';
import * as Style from './styles';

const navbarLogoWidth = 76;
const navbarLogoHeight = 50;

export default function Navbar() {
	const { openModal } = useModal();
	const { currentTheme } = useTheme();
	const logoSrc = currentTheme === 'light' ? mainLogoLight : mainLogoDark;

	function handleOpenModal(e: SyntheticEvent) {
		openModal(e, <AuthPage />);
	}

	return (
		<Style.Container>
			<Style.Top alignItems="center" justifyContent="center">
				<Style.NavbarLink to="/">
					<img
						src={logoSrc}
						alt={`main logo ${currentTheme}`}
						width={navbarLogoWidth}
						height={navbarLogoHeight}
					/>
				</Style.NavbarLink>
			</Style.Top>
			<Style.Middle flexDirection="column" alignItems="center" justifyContent="space-evenly">
				<Style.NavbarLink to="/dashboard">
					<Icon.Dashboard />
					<p>대시보드</p>
				</Style.NavbarLink>
				<Style.NavbarLink to="/portfolios">
					<Icon.List />
					<p>내 포트폴리오</p>
				</Style.NavbarLink>
				<Style.NavbarLink to="/cash">
					<Icon.Coins />
					<p>현금</p>
				</Style.NavbarLink>
				<Style.NavbarLink to="/dividend">
					<Icon.CoinsOnHand />
					<p>배당</p>
				</Style.NavbarLink>
				<Style.NavbarLink to="/settings">
					<Icon.Settings />
					<p>설정</p>
				</Style.NavbarLink>
			</Style.Middle>
			<Style.Bottom alignItems="center" justifyContent="center">
				<Button
					type="button"
					flex
					flexDirection="column"
					alignItems="center"
					css={navbarIconMixin}
					onClick={handleOpenModal}
				>
					<Icon.SignIn />
					<p>로그인</p>
				</Button>
			</Style.Bottom>
		</Style.Container>
	);
}
