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
			dropdownBgColor: string;
			dropdownBorderColor: string;
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
		scrollBar: {
			normal: {
				backgroundColor: string;
			};
			global: {
				backgroundColor: string;
				hoverBackgroundColor: string;
			};
		};
		stockPage: {
			textSubColor: string;
			borderColor: string;
			currencySymbol: string;
		};
	}
}
