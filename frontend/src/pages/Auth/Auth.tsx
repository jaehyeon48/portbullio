import { useTheme } from 'styled-components';
import { useLocation } from 'react-router-dom';
import envConfig from '@configs/env';
import mainLogoLight from '@assets/images/auth_page_main_logo_light.webp';
import mainLogoDark from '@assets/images/auth_page_main_logo_dark.webp';
import { Google, Naver, Kakao } from '@components/Icon';
import * as Style from './styles';

const { baseRedirectURI, google } = envConfig.oauth;

const googleOAuthURL = `${google.endPoint}?client_id=${google.clientId}&redirect_uri=${baseRedirectURI}/google/callback&response_type=code&scope=${google.scope}`;

export default function Auth() {
	const { pathname } = useLocation();
	const prevPathInfo = encodeURIComponent(JSON.stringify({ prevPath: pathname }));
	const { currentTheme } = useTheme();
	const logoSrc = currentTheme === 'light' ? mainLogoLight : mainLogoDark;

	return (
		<Style.PageContainer>
			<Style.HeaderContainer flexDirection="column" alignItems="center">
				<img src={logoSrc} alt={`main logo ${currentTheme}`} width={96} height={63} />
				<header>환영합니다!</header>
			</Style.HeaderContainer>
			<Style.ButtonContainer flexDirection="column" justifyContent="space-evenly">
				<Style.Button
					as="a"
					href={`${googleOAuthURL}&state=${prevPathInfo}`}
					color="#fff"
					backgroundcolor="#DC4E41"
					aria-label="Google auth"
				>
					<Style.ButtonIconContainer>
						<Google fill="#fff" />
					</Style.ButtonIconContainer>
					<Style.ButtonTextContainer>구글로 시작하기</Style.ButtonTextContainer>
				</Style.Button>
				<Style.Button as="a" color="#fff" backgroundcolor="#19CE60" aria-label="Naver auth">
					<Style.ButtonIconContainer>
						<Naver />
					</Style.ButtonIconContainer>
					<Style.ButtonTextContainer>네이버로 시작하기</Style.ButtonTextContainer>
				</Style.Button>
				<Style.Button as="a" color="#614345" backgroundcolor="#FAE100" aria-label="Kakao auth">
					<Style.ButtonIconContainer>
						<Kakao />
					</Style.ButtonIconContainer>
					<Style.ButtonTextContainer>카카오로 시작하기</Style.ButtonTextContainer>
				</Style.Button>
			</Style.ButtonContainer>
		</Style.PageContainer>
	);
}
