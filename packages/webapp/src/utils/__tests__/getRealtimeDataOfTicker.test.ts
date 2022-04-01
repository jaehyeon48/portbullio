import { RealtimeData } from '@portbullio/shared/src/types';
import getRealtimeDataOfTicker from '../getRealtimeDataOfTicker';

describe('getRealtimeDataOfTicker util function', () => {
	test('Should return null if cannot find a target ticker', () => {
		expect(getRealtimeDataOfTicker(dummyData, 'C')).toBe(null);
	});

	test(`Should return target ticker's full data when not pass a target property parameter`, () => {
		expect(getRealtimeDataOfTicker(dummyData, 'A')).toStrictEqual({
			ticker: 'A',
			price: '100',
			change: '1'
		});
	});

	test(`Should return target ticker's partial data when pass a target property parameter`, () => {
		expect(getRealtimeDataOfTicker(dummyData, 'B', 'price')).toBe('200');
	});
});

const dummyData: RealtimeData[] = [
	{ ticker: 'A', price: '100', change: '1' },
	{ ticker: 'B', price: '200', change: '-1' }
];
