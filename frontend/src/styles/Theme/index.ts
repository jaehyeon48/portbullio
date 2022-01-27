import { DefaultTheme } from 'styled-components';
import { BreakPoints, GlobalColors, ThemeColors } from '@types';

const globalColors: GlobalColors = {
	primary: '#12B886'
};

// 해상도 break point는 https://gs.statcounter.com/screen-resolution-stats/ 참조하였음.
const breakPoints: BreakPoints = {
	mobile: '414px', // 414x736
	mobileLandscape: '640px', // 640x360(360x640)
	tablet: '810px', // 810x1080
	tabletLandscape: '1280px', // 1280x800(800x1280)
	laptop: '1536px' // 1536x864
};

const lightThemeColors: ThemeColors = {};
const darkThemeColors: ThemeColors = {};

export const lightTheme: DefaultTheme = {
	currentTheme: 'light',
	globalColors,
	breakPoints,
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
	breakPoints,
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
