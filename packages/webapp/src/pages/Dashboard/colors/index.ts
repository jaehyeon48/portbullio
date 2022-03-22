import { Theme } from '@types';
import { barColorsLight, barColorsDark } from './barColors';

export function textColor(theme: Theme) {
	return theme === 'light' ? '#000' : '#FFF';
}

export function horizontalGridColor(theme: Theme) {
	return theme === 'light' ? `hsl(210, 11%, 50%)` : `hsl(210, 11%, 70%)`;
}

export function barColors(theme: Theme, idx: number, ticker: string) {
	const numOfColors = barColorsLight.length;
	if (ticker === '현금') return theme === 'light' ? 'hsl(60, 89%, 60%)' : 'hsl(60, 89%, 55%)';
	return theme === 'light' ? barColorsLight[idx % numOfColors] : barColorsDark[idx % numOfColors];
}

export function barTooltipBgColor(theme: Theme) {
	return theme === 'light' ? 'hsl(0, 0%, 99%)' : 'hsl(210, 17%, 23%)';
}
