export default function debounce(cb: any, limit: number) {
	let timer: NodeJS.Timeout;
	return (...args: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => cb(...args), limit);
	};
}
