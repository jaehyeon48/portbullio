import 'styled-components';
import { Theme, BreakPoints, GlobalColors, ThemeColors } from '@types';

declare module 'styled-components' {
	export interface DefaultTheme {
		currentTheme: Theme;
		breakPoints: BreakPoints;
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
		card: {
			bgColor: string;
			boxShadow: string;
		};
		modal: {
			backdropBgColor: string;
		};
		input: {
			labelColor: string;
		};
	}
}
