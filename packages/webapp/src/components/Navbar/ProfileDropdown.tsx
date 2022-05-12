import * as Style from './styles';

interface Props {
	logOutFn: any;
}

export default function ProfileDropdown({ logOutFn }: Props) {
	return (
		<Style.ProfileDropdownContainer>
			<Style.ProfilePageLink to="/profile">프로필 설정</Style.ProfilePageLink>
			<Style.ProfileDropdownButton type="button" aria-label="Logout" onClick={logOutFn}>
				로그아웃
			</Style.ProfileDropdownButton>
		</Style.ProfileDropdownContainer>
	);
}
