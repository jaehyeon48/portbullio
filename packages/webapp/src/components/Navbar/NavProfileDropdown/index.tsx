import * as Style from './styles';

interface Props {
	logOutFn: any;
}

export default function NavProfileDropdown({ logOutFn }: Props) {
	return (
		<Style.NavProfileDropdownContainer>
			<Style.NavProfilePageLink to="/profile">프로필 설정</Style.NavProfilePageLink>
			<Style.NavProfileDropdownButton type="button" aria-label="Logout" onClick={logOutFn}>
				로그아웃
			</Style.NavProfileDropdownButton>
		</Style.NavProfileDropdownContainer>
	);
}
