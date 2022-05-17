import debounce from '../debounce';

test('Call debounced function of sleep 100ms', () => {
	jest.useFakeTimers();
	const mockFn = jest.fn();
	const debouncedFn = debounce(mockFn, 100);

	debouncedFn();
	expect(mockFn).not.toBeCalled();
	jest.advanceTimersByTime(50);
	expect(mockFn).not.toBeCalled();
	jest.advanceTimersByTime(50);
	expect(mockFn).toBeCalled();
});
