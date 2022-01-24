import { DefaultTheme } from 'styled-components';
import { GlobalColors, ThemeColors } from '@types';

const globalColors: GlobalColors = {
	primary: '#12B886'
};

const lightThemeColors: ThemeColors = {};
const darkThemeColors: ThemeColors = {};

export const lightTheme: DefaultTheme = {
	currentTheme: 'light',
	globalColors,
	base: {
		bgColor: '#F8F9FA',
		textColor: '#000',
		colors: lightThemeColors
	},
	navbar: {
		bgColor: '#FFF',
		textColor: '#000'
	},
	card: {
		bgColor: '#FFF',
		boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)'
	},
	modal: {
		backdropBgColor: 'rgba(28, 35, 41, 0.25)'
	}
};

export const darkTheme: DefaultTheme = {
	currentTheme: 'dark',
	globalColors,
	base: {
		bgColor: '#1A1C34',
		textColor: '#FFF',
		colors: darkThemeColors
	},
	navbar: {
		bgColor: '#222338',
		textColor: '#FFF'
	},
	card: {
		bgColor: '#26273B',
		boxShadow: 'none'
	},
	modal: {
		backdropBgColor: 'rgba(120, 122, 124, 0.35)'
	}
};
