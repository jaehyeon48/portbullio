import { SyntheticEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mainLogoLight from '@assets/images/mainLogoLight.webp';
import mainLogoDark from '@assets/images/mainLogoDark.webp';
import { useAuth } from '@hooks/Auth';
import { useEmitter } from '@hooks/EventEmitter';
import { useModal } from '@hooks/Modal';
import useThemeMode from '@hooks/Theme';
import AuthPage from '@pages/Auth';
import LogOutPage from '@pages/LogOut';
import AvatarImage from '../AvatarImage';
import MobileNavMenu from './MobileNavMenu';
import NavProfileDropdown from './NavProfileDropdown';
import * as Style from './styles';
import * as Icon from '../Icons';
import SearchStocks from '../SearchStocks';

const navbarLogoWidth = 76;
const navbarLogoHeight = 50;

export default function Navbar() {
	const navigate = useNavigate();
	const Emitter = useEmitter();
	const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
	const [isNavProfileDropdownOpen, setIsNavProfileDropdownOpen] = useState(false);
	const { openModal } = useModal();
	const isAuthenticated = useAuth();
	const [currentTheme] = useThemeMode();
	const logoSrc = currentTheme === 'light' ? mainLogoLight : mainLogoDark;

	useEffect(() => {
		document.addEventListener('click', handleCloseNavDropdown);

		return () => {
			document.removeEventListener('click', handleCloseNavDropdown);
		};
	}, []);

	useEffect(() => {
		function closeNavDropdownOnLogOut() {
			closeNavDropdown();
		}

		Emitter.on('LOG_OUT', closeNavDropdownOnLogOut);

		return () => {
			Emitter.off('LOG_OUT', closeNavDropdownOnLogOut);
		};
	}, [Emitter]);

	function routeToStockPage(ticker: string) {
		navigate(`/stock/${ticker}/chart`);
	}

	function handleOpenLogInModal(e: SyntheticEvent) {
		openModal(e, <AuthPage />);
	}

	function handleOpenLogOutModal(e: SyntheticEvent) {
		openModal(e, <LogOutPage />);
	}

	function handleOpenNavProfileDropdown() {
		setIsNavProfileDropdownOpen(true);
	}

	function toggleMobileNavMenu() {
		setIsNavDropdownOpen(prev => !prev);
		document.body.classList.toggle('mobile-nav-opened');
	}

	function closeNavDropdown() {
		setIsNavDropdownOpen(false);
		document.body.classList.remove('mobile-nav-opened');
	}

	function handleCloseNavDropdown(e: Event) {
		const target = e.target as HTMLElement;
		if (target.closest('#nav-profile-button')) return;
		setIsNavProfileDropdownOpen(false);
	}

	return (
		<Style.Container>
			<Style.Top alignItems="center" justifyContent="center">
				<Style.NavbarLink to="/" onClick={closeNavDropdown}>
					<img
						src={logoSrc}
						alt="Navbar main logo"
						width={navbarLogoWidth}
						height={navbarLogoHeight}
					/>
				</Style.NavbarLink>
			</Style.Top>
			<Style.Middle>
				<Style.NavSearchStockContainer>
					<SearchStocks onResultClick={routeToStockPage} />
				</Style.NavSearchStockContainer>
				{isAuthenticated && (
					<Style.NavLinksContainer>
						<Style.NavbarLink to="/dashboard">
							<Icon.Dashboard />
							<p>대시보드</p>
						</Style.NavbarLink>
						<Style.NavbarLink to="/holdings">
							<Icon.CandleChart />
							<p>내 종목</p>
						</Style.NavbarLink>
						<Style.NavbarLink to="/portfolios">
							<Icon.List />
							<p>내 포트폴리오</p>
						</Style.NavbarLink>
						<Style.NavbarLink to="/cash">
							<Icon.Coins />
							<p>현금</p>
						</Style.NavbarLink>
					</Style.NavLinksContainer>
				)}
			</Style.Middle>
			<Style.Bottom alignItems="center" justifyContent="center">
				{isAuthenticated ? (
					<>
						<Style.NavBurgerButton
							type="button"
							aria-label="Toggle navbar dropdown"
							isNavDropdownOpened={isNavDropdownOpen}
							onClick={toggleMobileNavMenu}
						>
							<Icon.BurgerButton width={40} height={40} />
						</Style.NavBurgerButton>
						<Style.ProfileButton
							id="nav-profile-button"
							aria-label="User profile button"
							type="button"
							onClick={handleOpenNavProfileDropdown}
						>
							<Style.ProfileImageContainer>
								<AvatarImage userIconWidth={36} userIconHeight={36} />
							</Style.ProfileImageContainer>
						</Style.ProfileButton>
					</>
				) : (
					<Style.LoginButton type="button" onClick={handleOpenLogInModal}>
						<Icon.SignIn />
						<p>로그인</p>
					</Style.LoginButton>
				)}
			</Style.Bottom>
			{isNavProfileDropdownOpen && <NavProfileDropdown logOutFn={handleOpenLogOutModal} />}
			{isNavDropdownOpen && (
				<MobileNavMenu logOutFn={handleOpenLogOutModal} toggleMobileNavMenu={toggleMobileNavMenu} />
			)}
		</Style.Container>
	);
}
