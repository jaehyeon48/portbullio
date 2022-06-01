import asyncThrottleAndDebounce from '../asyncThrottleAndDebounce';

test('Call asyncThrottleAndDebounce function of limit 100ms', () => {
	jest.useFakeTimers();
	const mockFn = jest.fn();
	const fn = asyncThrottleAndDebounce(mockFn, 100);

	fn();
	fn();
	fn();
	fn();
	fn();
	expect(mockFn).toBeCalledTimes(1);

	// // after 50ms from last function call
	jest.advanceTimersByTime(50);
	fn();
	expect(mockFn).toBeCalledTimes(1);

	// // after 100ms from last function call
	jest.advanceTimersByTime(50);
	fn();
	expect(mockFn).toBeCalledTimes(2);

	jest.advanceTimersByTime(50);
	// not called by debounce yet
	expect(mockFn).toBeCalledTimes(2);
	jest.advanceTimersByTime(50);
	// called by debounce after 100ms from last function call
	expect(mockFn).toBeCalledTimes(3);
});
