export default function throttle(cb: any, limit: number) {
	let timer: NodeJS.Timeout;
	return (...args: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => cb(...args), limit);
	};
}
