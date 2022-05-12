import { useUserProfile } from '@hooks/ReactQuery';
import * as Style from './styles';

interface Props {
	logOutFn: any;
	toggleNavDropdown: any;
}

export default function NavDropdown({ logOutFn, toggleNavDropdown }: Props) {
	const profile = useUserProfile();

	return (
		<Style.NavDropdownContainer onClick={() => toggleNavDropdown()}>
			<Style.NavDropdownUsernameContainer>
				<p>반갑습니다, </p>
				<Style.NavDropdownUsername>{profile.data?.username ?? ''}</Style.NavDropdownUsername>님!
			</Style.NavDropdownUsernameContainer>
			<Style.NavDropdownLink to="/profile">프로필 설정</Style.NavDropdownLink>
			<Style.NavDropdownLink to="/dashboard">대시보드</Style.NavDropdownLink>
			<Style.NavDropdownLink to="/holdings">내 종목</Style.NavDropdownLink>
			<Style.NavDropdownLink to="/portfolios">내 포트폴리오</Style.NavDropdownLink>
			<Style.NavDropdownLink to="/cash">현금</Style.NavDropdownLink>
			<Style.NavDropdownLogOutButton type="button" aria-label="Logout" onClick={logOutFn}>
				로그아웃
			</Style.NavDropdownLogOutButton>
		</Style.NavDropdownContainer>
	);
}
