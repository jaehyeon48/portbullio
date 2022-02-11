import * as Style from './styles';

interface Props {
	logOutFn: any;
	profileFn: any;
}

export default function NavbarDropdown({ logOutFn, profileFn }: Props) {
	return (
		<Style.DropdownContainer>
			<Style.DropdownButton type="button" onClick={profileFn}>
				프로필 설정
			</Style.DropdownButton>
			<Style.DropdownButton type="button" onClick={logOutFn}>
				로그아웃
			</Style.DropdownButton>
		</Style.DropdownContainer>
	);
}
