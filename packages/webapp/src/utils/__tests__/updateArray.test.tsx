import updateArray from '../updateArray';

describe('updateArray test', () => {
	test('Should return an empty array when given array is null or undefined', () => {
		expect(updateArray(null, 1, el => el === 1)).toStrictEqual([]);
		expect(updateArray(undefined, 1, el => el === 1)).toStrictEqual([]);
	});

	test('Should update array of numbers immutably', () => {
		const originalArray = [1, 2, 3];

		expect(updateArray(originalArray, 10, el => el === 1)).toStrictEqual([10, 2, 3]);
		expect(updateArray(originalArray, 10, el => el === 2)).toStrictEqual([1, 10, 3]);
		expect(updateArray(originalArray, 10, el => el === 3)).toStrictEqual([1, 2, 10]);
		expect(updateArray(originalArray, 10, el => el === 100)).toStrictEqual(originalArray);
	});

	test('Should update array of strings immutably', () => {
		const originalArray = ['a', 'b', 'c'];

		expect(updateArray(originalArray, 'z', el => el === 'b')).toStrictEqual(['a', 'z', 'c']);
		expect(updateArray(originalArray, 'z', el => el === 'bb')).toStrictEqual(originalArray);
	});

	test('Should update array of objects immutably', () => {
		const originalArray = [
			{ id: 1, val: 'a' },
			{ id: 2, val: 'b' },
			{ id: 3, val: 'c' }
		];

		const expectedCase1 = [
			{ id: 1, val: 'a' },
			{ id: 2, val: 'x' },
			{ id: 3, val: 'c' }
		];

		const expectedCase2 = [
			{ id: 1, val: 'a' },
			{ id: 2, val: 'b' },
			{ id: 5, val: 'cc' }
		];

		expect(updateArray(originalArray, { id: 2, val: 'x' }, el => el.id === 2)).toStrictEqual(
			expectedCase1
		);
		expect(updateArray(originalArray, { id: 5, val: 'cc' }, el => el.id === 3)).toStrictEqual(
			expectedCase2
		);
	});

	test('Should update array of arrays immutably', () => {
		const originalArray = [
			[1, 2, 3, 4, 5],
			['a', 'b', 'c', 'd', 'e'],
			[6, 7, 8, 9, 10]
		];

		const expectedCase1 = [
			[1, 2, 3, 4, 5],
			[100, 200, 300],
			[6, 7, 8, 9, 10]
		];

		const expectedCase2 = [
			[1, 2, 3, 4, 5, 6, 7],
			['a', 'b', 'c', 'd', 'e'],
			[6, 7, 8, 9, 10]
		];

		expect(updateArray(originalArray, [100, 200, 300], (_, idx) => idx === 1)).toStrictEqual(
			expectedCase1
		);
		expect(updateArray(originalArray, [1, 2, 3, 4, 5, 6, 7], (_, idx) => idx === 0)).toStrictEqual(
			expectedCase2
		);
	});
});
