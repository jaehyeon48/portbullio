export type Theme = 'light' | 'dark';

export interface GlobalColors {
	primary: string;
}

export interface BreakPoints {
	mobile: string;
	mobileLandscape: string;
	tablet: string;
	tabletLandscape: string;
	laptop: string;
}

export interface ThemeColors {}

export interface IconProps {
	width?: number;
	height?: number;
	fill?: string;
}
