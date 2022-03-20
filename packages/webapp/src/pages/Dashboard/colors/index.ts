import { Theme } from '@types';

export function textColor(theme: Theme) {
	return theme === 'light' ? '#000' : '#FFF';
}

export function horizontalGridColor(theme: Theme) {
	return theme === 'light' ? `hsl(210, 11%, 50%)` : `hsl(210, 11%, 70%)`;
}
