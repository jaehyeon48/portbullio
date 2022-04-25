import { useLocation } from 'react-router-dom';
import useThemeMode from '@hooks/Theme';
import envConfig from '@configs/env';
import mainLogoLight from '@assets/images/auth_page_main_logo_light.webp';
import mainLogoDark from '@assets/images/auth_page_main_logo_dark.webp';
import { Google as GoogleIcon, Naver as NaverIcon, Kakao as KakaoIcon } from '@components/index';
import * as Style from './styles';

const { redirectBaseUrl, google, naver } = envConfig.oauth;

const googleOAuthURL = `${google.endPoint}?client_id=${google.clientId}&redirect_uri=${redirectBaseUrl}/google/callback&response_type=code&scope=${google.scope}`;

const naverOAuthURL = `${naver.baseUrl}?client_id=${
	naver.clientId
}&redirect_uri=${redirectBaseUrl}/naver/callback&response_type=code&state=${encodeURIComponent(
	naver.state!
)}`;

export default function Auth() {
	const { pathname } = useLocation();
	const prevPathInfo = encodeURIComponent(JSON.stringify({ prevPath: pathname }));
	const [currentTheme] = useThemeMode();
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
					bgColor="#DC4E41"
					aria-label="Google auth"
				>
					<Style.ButtonIconContainer>
						<GoogleIcon width={22} height={22} fill="#fff" />
					</Style.ButtonIconContainer>
					<Style.ButtonTextContainer>구글로 시작하기</Style.ButtonTextContainer>
				</Style.Button>
				<Style.Button
					as="a"
					color="#fff"
					href={naverOAuthURL}
					bgColor="#19CE60"
					aria-label="Naver auth"
				>
					<Style.ButtonIconContainer>
						<NaverIcon width={22} height={22} />
					</Style.ButtonIconContainer>
					<Style.ButtonTextContainer>네이버로 시작하기</Style.ButtonTextContainer>
				</Style.Button>
				<Style.Button as="a" color="#614345" bgColor="#FAE100" aria-label="Kakao auth">
					<Style.ButtonIconContainer>
						<KakaoIcon width={22} height={22} />
					</Style.ButtonIconContainer>
					<Style.ButtonTextContainer>카카오로 시작하기</Style.ButtonTextContainer>
				</Style.Button>
			</Style.ButtonContainer>
		</Style.PageContainer>
	);
}
