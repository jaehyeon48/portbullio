import { SyntheticEvent } from 'react';

export type Theme = 'light' | 'dark';
export type AuthType = 'google' | 'naver' | 'kakao';
export type CloseModalFn = (e: SyntheticEvent, stopBubble?: boolean) => void;

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
	green: string;
}

export interface IconProps {
	width?: number;
	height?: number;
	fill?: string;
}

export interface ScrollBarThumbProps {
	height: number;
}
