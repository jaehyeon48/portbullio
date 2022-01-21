import { DefaultTheme } from 'styled-components';
import { Colors } from '@types';

const colors: Colors = {
	primary: '#12B886'
};

export const lightTheme: DefaultTheme = {
	currentTheme: 'light',
	colors,
	base: {
		bgColor: '#F8F9FA',
		textColor: '#000'
	},
	navbar: {
		bgColor: '#FFF',
		textColor: '#000'
	}
};

export const darkTheme: DefaultTheme = {
	currentTheme: 'dark',
	colors,
	base: {
		bgColor: '#1A1C34',
		textColor: '#FFF'
	},
	navbar: {
		bgColor: '#222338',
		textColor: '#FFF'
	}
};
