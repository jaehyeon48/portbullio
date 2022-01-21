import { DefaultTheme } from 'styled-components';

const primary = '#12B886';

export const lightTheme: DefaultTheme = {
	base: {
		bgColor: '#F8F9FA',
		textColor: '#000',
		primary
	}
};

export const darkTheme: DefaultTheme = {
	base: {
		bgColor: '#1A1C34',
		textColor: '#FFF',
		primary
	}
};
