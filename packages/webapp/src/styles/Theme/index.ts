import { DefaultTheme } from 'styled-components';
import { ThemeColors } from '@types';

const lightThemeColors: ThemeColors = {
	gray: '#ADB5BD',
	darkGray: '#53585E',
	blue: '#0463D1',
	red: '#FA5252',
	green: '#0CA678'
};

const darkThemeColors: ThemeColors = {
	gray: '#CED4DA',
	darkGray: '#62626D',
	blue: '#3688EA',
	red: '#FF4268',
	green: '#3AB773'
};

export const lightTheme: DefaultTheme = {
	currentTheme: 'light',
	base: {
		bgColor: '#F8F9FA',
		textColor: '#000',
		colors: lightThemeColors
	},
	navbar: {
		bgColor: '#FFF',
		textColor: '#000',
		dropdownBgColor: '#E2E2Eb',
		dropdownBorderColor: '#CCCCE3'
	},
	card: {
		bgColor: '#FFF',
		boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)'
	},
	modal: {
		backdropBgColor: 'rgba(28, 35, 41, 0.25)'
	},
	input: {
		labelColor: '#5B5B5B',
		backgroundColor: '#FFF'
	},
	scrollBar: {
		normal: {
			backgroundColor: 'rgba(160, 160, 160, 0.4)'
		},
		global: {
			backgroundColor: 'rgba(115, 115, 115, 0.5)',
			hoverBackgroundColor: 'rgba(68, 68, 68, 0.5)'
		}
	},
	stockPage: {
		textSubColor: '#868E96',
		borderColor: '#DEE1E5',
		currencySymbol: '#9CA6B0'
	},
	userIcon: {
		bgColor: '#57636F'
	}
};

export const darkTheme: DefaultTheme = {
	currentTheme: 'dark',
	base: {
		bgColor: '#1A1C34',
		textColor: '#FFF',
		colors: darkThemeColors
	},
	navbar: {
		bgColor: '#222338',
		textColor: '#FFF',
		dropdownBgColor: '#3B3C54',
		dropdownBorderColor: '#4A4A70'
	},
	card: {
		bgColor: '#26273B',
		boxShadow: 'none'
	},
	modal: {
		backdropBgColor: 'rgba(120, 122, 124, 0.35)'
	},
	input: {
		labelColor: '#BABABA',
		backgroundColor: '#323645'
	},
	scrollBar: {
		normal: {
			backgroundColor: 'rgba(187, 187, 187, 0.4)'
		},
		global: {
			backgroundColor: 'rgba(131, 131, 131, 0.5)',
			hoverBackgroundColor: 'rgba(98, 98, 98, 0.5)'
		}
	},
	stockPage: {
		textSubColor: '#98A7B6',
		borderColor: '#4F5278',
		currencySymbol: '#A6B6C6'
	},
	userIcon: {
		bgColor: '#A3A9AF'
	}
};