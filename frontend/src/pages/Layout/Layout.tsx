import { Outlet } from 'react-router-dom';
import { Navbar, PageContainer } from '@components/index';

export default function Layout() {
	return (
		<>
			<Navbar />
			<PageContainer>
				<Outlet />
			</PageContainer>
		</>
	);
}
