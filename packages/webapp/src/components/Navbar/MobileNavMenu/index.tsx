import { useUserProfile } from '@hooks/ReactQuery';
import * as Style from './styles';

interface Props {
	logOutFn: any;
	toggleMobileNavMenu: any;
}

export default function MobileNavMenu({ logOutFn, toggleMobileNavMenu }: Props) {
	const profile = useUserProfile();

	return (
		<Style.MobileNavMenuContainer onClick={() => toggleMobileNavMenu()}>
			<Style.MobileNavMenuUsernameContainer>
				<p>반갑습니다, </p>
				<Style.MobileNavMenuUsername>{profile.data?.username ?? ''}</Style.MobileNavMenuUsername>
				님!
			</Style.MobileNavMenuUsernameContainer>
			<Style.MobileNavMenuList>
				{menuList.map(({ to, name }) => (
					<Style.MobileNavMenuListItem key={to}>
						<Style.MobileNavMenuLink to={to}>{name}</Style.MobileNavMenuLink>
					</Style.MobileNavMenuListItem>
				))}
			</Style.MobileNavMenuList>
			<Style.MobileNavMenuLogOutButton type="button" aria-label="Logout" onClick={logOutFn}>
				로그아웃
			</Style.MobileNavMenuLogOutButton>
		</Style.MobileNavMenuContainer>
	);
}

const menuList = [
	{
		to: '/profile',
		name: '프로필 설정'
	},
	{
		to: '/dashboard',
		name: '대시보드'
	},
	{
		to: '/holdings',
		name: '내 종목'
	},
	{
		to: '/portfolios',
		name: '내 포트폴리오'
	},
	{
		to: '/cash',
		name: '현금'
	}
];
