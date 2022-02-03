import { useTheme } from 'styled-components';
import { useLocation } from 'react-router-dom';
import envConfig from '@configs/env';
import mainLogoLight from '@assets/images/auth_page_main_logo_light.webp';
import mainLogoDark from '@assets/images/auth_page_main_logo_dark.webp';
import Button from '@components/Button';
import { Google, Naver, Kakao } from '@components/Icon';
import {
	AuthPageContainer,
	AuthPageHeaderContainer,
	AuthPageButtonContainer,
	AuthPageButtonIconContainer,
	AuthPageButtonTextContainer
} from './styles';

const { baseRedirectURI, google } = envConfig.oauth;

const googleOAuthURL = `${google.endPoint}?client_id=${google.clientId}&redirect_uri=${baseRedirectURI}/google/callback&response_type=code&scope=${google.scope}`;

export default function Auth() {
	const { pathname } = useLocation();
	const prevPathInfo = encodeURIComponent(JSON.stringify({ prevPath: pathname }));
	const { currentTheme } = useTheme();
	const logoSrc = currentTheme === 'light' ? mainLogoLight : mainLogoDark;

	return (
		<AuthPageContainer>
			<AuthPageHeaderContainer flexDirection="column" alignItems="center">
				<img src={logoSrc} alt={`main logo ${currentTheme}`} width={96} height={63} />
				<header>환영합니다!</header>
			</AuthPageHeaderContainer>
			<AuthPageButtonContainer flexDirection="column" justifyContent="space-evenly">
				<Button
					as="a"
					href={`${googleOAuthURL}&state=${prevPathInfo}`}
					flex
					color="#fff"
					backgroundColor="#DC4E41"
					aria-label="Google auth"
				>
					<AuthPageButtonIconContainer>
						<Google fill="#fff" />
					</AuthPageButtonIconContainer>
					<AuthPageButtonTextContainer>구글로 시작하기</AuthPageButtonTextContainer>
				</Button>
				<Button as="a" flex color="#fff" backgroundColor="#19CE60" aria-label="Naver auth">
					<AuthPageButtonIconContainer>
						<Naver />
					</AuthPageButtonIconContainer>
					<AuthPageButtonTextContainer>네이버로 시작하기</AuthPageButtonTextContainer>
				</Button>
				<Button as="a" flex color="#614345" backgroundColor="#FAE100" aria-label="Kakao auth">
					<AuthPageButtonIconContainer>
						<Kakao />
					</AuthPageButtonIconContainer>
					<AuthPageButtonTextContainer>카카오로 시작하기</AuthPageButtonTextContainer>
				</Button>
			</AuthPageButtonContainer>
		</AuthPageContainer>
	);
}
