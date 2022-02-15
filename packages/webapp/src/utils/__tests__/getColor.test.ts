import { lightTheme, darkTheme } from '@styles/Theme';
import getColor from '../getColor';

test('getColor function test', () => {
	const primaryColor = '#12B886';
	expect(getColor(lightTheme, 'not exist color name')).toBeUndefined();

	// global colors test
	expect(getColor(lightTheme, 'primary')).toBe(primaryColor);
	expect(getColor(darkTheme, 'primary')).toBe(primaryColor);
});
