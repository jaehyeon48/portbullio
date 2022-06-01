type ThrottledFunction<T extends (...args: any) => any> = (
	...args: Parameters<T>
) => Promise<ReturnType<T>>;

export default function asyncThrottleAndDebounce<T extends (...args: any) => any>(
	callback: T,
	limit: number
): ThrottledFunction<T> {
	let lastCalledTime = 0;
	let timer: NodeJS.Timeout;
	return async (...args: any): Promise<ReturnType<any>> => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), limit);
		const now = Date.now();
		if (now - lastCalledTime < limit) return;
		callback(...args);
		lastCalledTime = now;
	};
}
