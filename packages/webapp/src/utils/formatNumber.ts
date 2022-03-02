export default function formatNum(inputNum: string | number) {
	const num = typeof inputNum === 'string' ? Number(inputNum) : inputNum;
	return Intl.NumberFormat('en-US').format(num);
}
