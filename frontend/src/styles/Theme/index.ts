import { DefaultTheme } from 'styled-components';

const primary = '#12B886';

export const lightTheme: DefaultTheme = {
	currentTheme: 'light',
	base: {
		bgColor: '#F8F9FA',
		textColor: '#000',
		primary
	}
};

export const darkTheme: DefaultTheme = {
	currentTheme: 'dark',
	base: {
		bgColor: '#1A1C34',
		textColor: '#FFF',
		primary
	}
};
