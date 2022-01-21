import 'styled-components';
import { Theme } from '@types';

declare module 'styled-components' {
	export interface DefaultTheme {
		currentTheme: Theme;
		colors: Colors;
		base: {
			bgColor: string;
			textColor: string;
		};
		navbar: {
			bgColor: string;
			textColor: string;
		};
	}
}
