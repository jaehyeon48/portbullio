import { SyntheticEvent } from 'react';
import { PortfolioPrivacy } from '@portbullio/shared/src/types';

export type Theme = 'light' | 'dark';
export type AuthType = 'google' | 'naver' | 'kakao';
export type CloseModalFn = (e: SyntheticEvent, stopBubble?: boolean) => void;

export interface IconProps {
	width?: number;
	height?: number;
	fill?: string;
}

export interface VerticalScrollBarThumbProps {
	height: number;
}

export interface HorizontalScrollBarThumbProps {
	width: number;
}

export interface Portfolio {
	id: number;
	userId: number;
	name: string;
	privacy: PortfolioPrivacy;
	createdAt: Date;
}

export interface Holding {
	ticker: string;
	avgCost: number;
	quantity: number;
}
