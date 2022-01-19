import { ReactElement } from 'react';
import { GlobalFonts, GlobalStyles } from '@components/Styles';

function App(): ReactElement {
	return (
		<>
			<GlobalFonts />
			<GlobalStyles />
			<p>Hello, world!</p>
		</>
	);
}

export default App;
