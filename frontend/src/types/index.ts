export type Theme = 'light' | 'dark';
export type AuthType = 'google' | 'naver' | 'kakao';

export interface GlobalColors {
	primary: string;
	deepRed: string;
}

export interface BreakPoints {
	mobile: string;
	mobileLandscape: string;
	tablet: string;
	tabletLandscape: string;
	laptop: string;
}

export interface ThemeColors {
	gray: string;
	darkGray: string;
	blue: string;
	red: string;
}

export interface IconProps {
	width?: number;
	height?: number;
	fill?: string;
}
