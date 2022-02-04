import { ReactElement, useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Global from '@styles/Global';
import Navbar from '@components/Navbar';
import HomePage from '@pages/Home';
import WelcomePage from '@pages/Welcome';
import { checkAuth } from '@api/auth';
import { useAuthUpdate } from '@hooks/Auth';

function App(): ReactElement {
	const setAuth = useAuthUpdate();

	useLayoutEffect(() => {
		(async () => {
			setAuth(!!(await checkAuth()));
		})();
	}, [setAuth]);

	return (
		<>
			<Global.CSSReset />
			<Global.GlobalFonts />
			<Global.GlobalStyles />
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/welcome" element={<WelcomePage />} />
			</Routes>
		</>
	);
}

export default App;
