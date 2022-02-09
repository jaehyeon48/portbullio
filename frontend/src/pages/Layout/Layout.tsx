import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar';
import PageContainer from '@components/PageContainer';

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
