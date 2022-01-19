import { ReactElement } from 'react';
import { CSSReset, GlobalFonts, GlobalStyles } from '@components/Styles';

function App(): ReactElement {
	return (
		<>
			<CSSReset />
			<GlobalFonts />
			<GlobalStyles />
			<p>Hello, world!</p>
		</>
	);
}

export default App;
