import 'styled-components';
import { Theme, ThemeColors } from '@types';

declare module 'styled-components' {
	export interface DefaultTheme {
		currentTheme: Theme;
		base: {
			bgColor: string;
			textColor: string;
			colors: ThemeColors;
		};
		navbar: {
			bgColor: string;
			textColor: string;
		};
		card: {
			bgColor: string;
			boxShadow: string;
		};
		modal: {
			backdropBgColor: string;
		};
		input: {
			labelColor: string;
			backgroundColor: string;
		};
	}
}
