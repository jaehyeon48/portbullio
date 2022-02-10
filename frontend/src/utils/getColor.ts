import { DefaultTheme } from 'styled-components';
import { globalColors } from '@constants';
import { GlobalColors, ThemeColors } from '@types';

const getColor = (theme: DefaultTheme, key: string) =>
	globalColors[key as keyof GlobalColors] ?? theme.base.colors[key as keyof ThemeColors];

export default getColor;
