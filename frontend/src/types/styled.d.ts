import 'styled-components';
import { Theme, GlobalColors, ThemeColors } from '@types';

declare module 'styled-components' {
	export interface DefaultTheme {
		currentTheme: Theme;
		globalColors: GlobalColors;
		base: {
			bgColor: string;
			textColor: string;
			colors: ThemeColors;
		};
		navbar: {
			bgColor: string;
			textColor: string;
		};
	}
}
