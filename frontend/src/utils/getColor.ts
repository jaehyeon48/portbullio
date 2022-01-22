import { DefaultTheme } from 'styled-components';
import { GlobalColors, ThemeColors } from '@types';

const getColor = (theme: DefaultTheme, key: string) =>
	theme.globalColors[key as keyof GlobalColors] ?? theme.base.colors[key as keyof ThemeColors];

export default getColor;
