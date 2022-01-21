import 'styled-components';
import { Theme } from '@types';

declare module 'styled-components' {
	export interface DefaultTheme {
		currentTheme: Theme;
		base: {
			bgColor: string;
			textColor: string;
			primary: string;
		};
	}
}
