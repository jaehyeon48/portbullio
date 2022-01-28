import { useTheme } from 'styled-components';
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
} from './style';

export default function Auth() {
	const { currentTheme } = useTheme();
	const logoSrc = currentTheme === 'light' ? mainLogoLight : mainLogoDark;

	return (
		<AuthPageContainer>
			<AuthPageHeaderContainer flexDirection="column" alignItems="center">
				<img src={logoSrc} alt={`main logo ${currentTheme}`} width={96} height={63} />
				<header>환영합니다!</header>
			</AuthPageHeaderContainer>
			<AuthPageButtonContainer flexDirection="column" justifyContent="space-evenly">
				<Button type="button" flex color="#fff" backgroundColor="#DC4E41" aria-label="Google auth">
					<AuthPageButtonIconContainer>
						<Google fill="#fff" />
					</AuthPageButtonIconContainer>
					<AuthPageButtonTextContainer>구글로 시작하기</AuthPageButtonTextContainer>
				</Button>
				<Button type="button" flex color="#fff" backgroundColor="#19CE60" aria-label="Naver auth">
					<AuthPageButtonIconContainer>
						<Naver />
					</AuthPageButtonIconContainer>
					<AuthPageButtonTextContainer>네이버로 시작하기</AuthPageButtonTextContainer>
				</Button>
				<Button
					type="button"
					flex
					color="#614345"
					backgroundColor="#FAE100"
					aria-label="Kakao auth"
				>
					<AuthPageButtonIconContainer>
						<Kakao />
					</AuthPageButtonIconContainer>
					<AuthPageButtonTextContainer>카카오로 시작하기</AuthPageButtonTextContainer>
				</Button>
			</AuthPageButtonContainer>
		</AuthPageContainer>
	);
}
